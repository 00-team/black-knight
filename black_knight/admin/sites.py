from functools import update_wrapper

from django.contrib import admin
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect

from .utils import E, get_data


INVALID_LOGIN_DATA = E('Invalid Login Data!')


class AdminSite(admin.AdminSite):
    # name = 'black_knight'
    template = 'black-knight.html'

    def __init__(self, name='black_knight'):
        return super().__init__(name)

    def register(self, model_or_iterable, admin_class=None, **options):
        return super().register(
            model_or_iterable=model_or_iterable,
            admin_class=admin_class, **options
        )

    def admin_view(self, view, json, cacheable=False):

        def inner(request: HttpRequest, *args, **kwargs):
            if not self.has_permission(request):
                if json is False:
                    from django.contrib.auth.views import redirect_to_login

                    return redirect_to_login(
                        request.get_full_path(),
                        reverse('black_knight:login', current_app=self.name),
                    )

                return JsonResponse({
                    'error': 'Admin Login Required!',
                    'login_required': True
                })

            return view(request, *args, **kwargs)

        if not cacheable:
            inner = never_cache(inner)

        if not getattr(view, 'csrf_exempt', False):
            inner = csrf_protect(inner)

        return update_wrapper(inner, view)

    def get_urls(self):
        from django.urls import include, path, re_path

        def wrap(view, json=True, cacheable=False):
            def wrapper(*args, **kwargs):
                return self.admin_view(view, json, cacheable)(*args, **kwargs)

            wrapper.admin_site = self
            return update_wrapper(wrapper, view)

        urlpatterns = [
            path('', wrap(self.index, json=False), name='index'),
            path('api/', include([
                path('index/', wrap(self.api_index), name='index'),
                path('login/', self.api_login, name='login'),
            ]), name='api'),
            path('logout/', wrap(self.logout), name='logout'),
        ]

        return urlpatterns

        # Admin-site-wide views.
        urlpatterns = [
            path('', wrap(self.index), name='index'),
            path('login/', self.login, name='login'),
            path('logout/', wrap(self.logout), name='logout'),
            path(
                'password_change/',
                wrap(self.password_change, cacheable=True),
                name='password_change',
            ),
            path(
                'password_change/done/',
                wrap(self.password_change_done, cacheable=True),
                name='password_change_done',
            ),
            path('autocomplete/', wrap(self.autocomplete_view), name='autocomplete'),
            path('jsi18n/', wrap(self.i18n_javascript,
                 cacheable=True), name='jsi18n'),
            # path(
            #     'r/<int:content_type_id>/<path:object_id>/',
            #     wrap(contenttype_views.shortcut),
            #     name='view_on_site',
            # ),
        ]

        # Add in each model's views, and create a list of valid URLS for the
        # app_index
        valid_app_labels = []
        for model, model_admin in self._registry.items():
            urlpatterns += [
                path(
                    '%s/%s/' % (model._meta.app_label, model._meta.model_name),
                    include(model_admin.urls),
                ),
            ]
            if model._meta.app_label not in valid_app_labels:
                valid_app_labels.append(model._meta.app_label)

        # If there were ModelAdmins registered, we should have a list of app
        # labels for which we need to allow access to the app_index view,
        if valid_app_labels:
            regex = r'^(?P<app_label>' + '|'.join(valid_app_labels) + ')/$'
            urlpatterns += [
                re_path(regex, wrap(self.app_index), name='app_list'),
            ]

        if self.final_catch_all_view:
            urlpatterns.append(
                re_path(r'(?P<url>.*)$', wrap(self.catch_all_view)))

        return urlpatterns

    @property
    def urls(self):
        return self.get_urls(), 'black_knight', self.name

    def index(self, request: HttpRequest):
        return render(request, self.template)

    def api_index(self, request: HttpRequest):
        return JsonResponse({'index': 'api'})

    def api_login(self, request: HttpRequest):
        try:
            data = get_data(request)
            username = data.get('username')
            password = data.get('password')

            if username is None or password is None:
                raise INVALID_LOGIN_DATA

            user = authenticate(
                request=request,
                username=username,
                password=password
            )

            if user is None:
                raise INVALID_LOGIN_DATA

            if not user.is_active:
                raise E('This User is Inactive')

            if not user.is_staff:
                raise E('This User is not a Staff')

            auth_login(request, user)
            get_token(request)

            return JsonResponse({'ok': 'Your Login was Successful!'})
        except E as e:
            return e.response

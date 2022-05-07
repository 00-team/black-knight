from functools import update_wrapper
from typing import Any

from django.apps import apps
from django.contrib import admin
# from django.contrib.admin.models import LogEntry
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.http import HttpRequest, HttpResponseRedirect, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.urls import reverse
from django.utils.text import capfirst
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect

from .utils import E, get_data


INVALID_LOGIN_DATA = E('Invalid Login Data!')


class AdminSite(admin.AdminSite):
    template = 'black-knight.html'

    def __init__(self, name='black_knight'):
        return super().__init__(name)

    def register(self, model_or_iterable: int = 'fg', admin_class=None, **options):
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

            # wrapper.admin_site = self
            return update_wrapper(wrapper, view)

        api_urls = [
            path('index/', wrap(self.api_index), name='index'),
            path('login/', self.api_login, name='login'),
            path('log/', self.api_log, name='log'),
        ]

        urlpatterns = [
            path('', wrap(self.index, json=False), name='index'),
            path('api/', include((api_urls, self.name), namespace='api')),
            path('logout/', self.logout, name='logout'),
            path('login/', self.index, name='login')
        ]

        return urlpatterns

        # Admin-site-wide views.

        # urlpatterns = [
        #     path(
        #         'password_change/',
        #         wrap(self.password_change, cacheable=True),
        #         name='password_change',
        #     ),
        # ]

        # # Add in each model's views, and create a list of valid URLS for the
        # # app_index
        # valid_app_labels = []
        # for model, model_admin in self._registry.items():
        #     urlpatterns += [
        #         path(
        #             '%s/%s/' % (model._meta.app_label, model._meta.model_name),
        #             include(model_admin.urls),
        #         ),
        #     ]
        #     if model._meta.app_label not in valid_app_labels:
        #         valid_app_labels.append(model._meta.app_label)

        # # If there were ModelAdmins registered, we should have a list of app
        # # labels for which we need to allow access to the app_index view,
        # if valid_app_labels:
        #     regex = r'^(?P<app_label>' + '|'.join(valid_app_labels) + ')/$'
        #     urlpatterns += [
        #         re_path(regex, wrap(self.app_index), name='app_list'),
        #     ]

        # if self.final_catch_all_view:
        #     urlpatterns.append(
        #         re_path(r'(?P<url>.*)$', wrap(self.catch_all_view)))

        # return urlpatterns

    @property
    def urls(self):
        return self.get_urls(), 'black_knight', self.name

    def _build_app_dict(self, request: HttpRequest, label=None) -> dict[str, Any]:
        app_dict: dict[str, Any] = {}

        if label:
            models = {
                m: m_a
                for m, m_a in self._registry.items()
                if m._meta.app_label == label
            }
        else:
            models = self._registry

        for model, model_admin in models.items():
            app_label = model._meta.app_label

            has_module_perms = model_admin.has_module_permission(request)
            if not has_module_perms:
                continue

            perms = model_admin.get_model_perms(request)

            if True not in perms.values():
                continue

            # info = (app_label, model._meta.model_name)
            model_dict = {
                'model': model,
                'name': capfirst(model._meta.verbose_name_plural),
                'object_name': model._meta.object_name,
                'perms': perms,
            }

            if app_label in app_dict:
                app_dict[app_label]['models'].append(model_dict)
            else:
                app_dict[app_label] = {
                    'name': apps.get_app_config(app_label).verbose_name,
                    'app_label': app_label,
                    # 'app_url': reverse(
                    #     'black_knight:app_list',
                    #     kwargs={'app_label': app_label},
                    #     current_app=self.name,
                    # ),
                    'has_module_perms': has_module_perms,
                    'models': [model_dict],
                }

        return app_dict

    def index(self, request: HttpRequest):
        return render(request, self.template)

    def api_index(self, request: HttpRequest):

        app_list = self.get_app_list(request)

        return JsonResponse({'apps': []})

    def api_log(self, request: HttpRequest):
        try:
            '''
            for log in LogEntry.objects.all():
                print(f'{log.action_time=}')
                print(f'{log.user=} - {log.content_type=}')
                print(f'{log.object_repr=} - {log.object_id=}')
                print(f'{log.action_flag=} - {log.change_message=}')
            '''

            # TODO: Making the log api
            return JsonResponse({'log': 'get the admin log here!'})
        except E as e:
            return e.response

    def logout(self, request: HttpRequest):
        auth_logout(request)
        return HttpResponseRedirect('/')

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

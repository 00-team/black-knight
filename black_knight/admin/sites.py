from functools import update_wrapper
from typing import Any

from black_knight.admin.models import GroupAdmin, UserAdmin
from black_knight.admin.options import ModelAdmin
from black_knight.admin.utils import E, get_data
from django.apps import apps
from django.conf import settings
from django.contrib import admin
# from django.contrib.admin.models import LogEntry
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.db.models.base import ModelBase
from django.http import HttpRequest, HttpResponseRedirect, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.urls import reverse
from django.utils.text import capfirst
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect


INVALID_LOGIN_DATA = E('Invalid Login Data!')


class AdminSite(admin.AdminSite):
    template = 'black-knight.html'
    default_avatar = settings.STATIC_URL + 'black_knight/default_avatar.jpg'

    def __init__(self, name='black_knight'):
        return super().__init__(name)

    def register(self, models, admin_class=None, **options):
        # check if models is a single model not an iterable
        if isinstance(models, ModelBase):
            models = [models]

        if admin_class is None:
            admin_class = ModelAdmin

        if not issubclass(admin_class, ModelAdmin):
            from django.contrib.auth.models import Group, User

            for model in models:
                # register a custom model admin for
                # default group and user model
                if model == Group:
                    admin_class = GroupAdmin

                if model == User:
                    admin_class = UserAdmin

        if not issubclass(admin_class, ModelAdmin):
            raise ValueError((
                'admin class that you register your model with, '
                'most be a sub class of black_knight.admin.ModelAdmin'
            ))

        return super().register(models, admin_class=admin_class, **options)

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

    @property
    def base_url(self) -> str:
        return reverse('black_knight:index', current_app=self.name)

    def _build_app_dict(self, request, label=None):
        '''
        Build the app dictionary. The optional `label` parameter filters models
        of a specific app.
        '''
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

            if not model_admin.has_module_permission(request):
                continue

            perms = model_admin.get_model_perms(request)

            if True not in perms.values():
                continue

            # info = (app_label, model._meta.model_name)

            model_dict = {
                'name': capfirst(model._meta.verbose_name_plural),
                'object_name': model._meta.object_name,
                'icon': model_admin.icon,
                'perms': perms,
            }

            if app_label in app_dict:
                app_dict[app_label]['models'].append(model_dict)
            else:
                app_dict[app_label] = {
                    'name': apps.get_app_config(app_label).verbose_name,
                    'app_label': app_label,
                    'models': [model_dict],
                }

        return app_dict

    def index(self, request: HttpRequest):
        context = {'base_url': self.base_url}
        return render(request, self.template, context)

    def api_index(self, request: HttpRequest):

        user = request.user
        app_list = self.get_app_list(request)

        response = {
            'user': {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'avatar': self.default_avatar
            },
            'apps': app_list
        }

        return JsonResponse(response)

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

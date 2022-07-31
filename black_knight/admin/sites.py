import logging
import re
from collections.abc import Iterable
from functools import update_wrapper
from typing import Any, Callable

from black_knight.admin import ModelAdmin, actions
from black_knight.admin.models import GroupAdmin, UserAdmin
from black_knight.admin.utils import E, get_data
from django.apps import apps
from django.conf import settings
from django.contrib import admin
from django.contrib.admin.sites import AlreadyRegistered
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.core.exceptions import ImproperlyConfigured
from django.db.models.base import ModelBase
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.urls import reverse
from django.utils.text import capfirst
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect


logger = logging.getLogger('black_knight.AdminSite')


INVALID_LOGIN_DATA = E('Invalid Login Data!')


class AdminSite(admin.AdminSite):
    template = 'black-knight.html'
    default_avatar = settings.STATIC_URL + 'black_knight/default_avatar.jpg'
    user_avatar: str | Iterable[str] | Callable[['AdminSite', Any], str] = None
    registered_apps = {}

    def __init__(self, name='black_knight'):
        super().__init__(name)
        self._actions = {'delete_selected': actions.delete_selected}
        self._global_actions = self._actions.copy()

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

        for model in models:
            if model._meta.abstract:
                raise ImproperlyConfigured(
                    'The model %s is abstract, so it cannot be registered with admin.'
                    % model.__name__
                )

            if model in self._registry:
                registered_admin = str(self._registry[model])
                msg = 'The model %s is already registered ' % model.__name__

                if registered_admin.endswith('.ModelAdmin'):
                    # Most likely registered without a ModelAdmin subclass.
                    msg += 'in app %r.' % re.sub(
                        r'\.ModelAdmin$', '', registered_admin
                    )
                else:
                    msg += 'with %r.' % registered_admin

                raise AlreadyRegistered(msg)

            if not model._meta.swapped:
                app_label = model._meta.app_label
                model_name = model._meta.model_name

                if not app_label in self.registered_apps:
                    self.registered_apps[app_label] = {}

                self.registered_apps[app_label][model_name] = (
                    model,
                    admin_class(model, self)
                )

                self._registry[model] = admin_class(model, self)

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
                }, status=401)

            return view(request, *args, **kwargs)

        if not cacheable:
            inner = never_cache(inner)

        if not getattr(view, 'csrf_exempt', False):
            inner = csrf_protect(inner)

        return update_wrapper(inner, view)

    def url_wrap(self, view, json=True, cacheable=False):
        def wrapper(*args, **kwargs):
            return self.admin_view(view, json, cacheable)(*args, **kwargs)

        return update_wrapper(wrapper, view)

    def get_api_urls(self):
        from django.urls import include, path

        api_urls = [
            path('user/', self.url_wrap(self.api_user), name='user'),
            path('index/', self.url_wrap(self.api_index), name='index'),
            path('log/', self.url_wrap(self.api_log), name='log'),
            path('login/', self.api_login, name='login'),
            path('logout/', self.url_wrap(self.api_logout), name='logout'),
        ]

        def get_model_url(item):
            model, model_admin = item
            app_label = model._meta.app_label
            model_name = model._meta.model_name

            return path(f'{app_label}/{model_name}/', include(model_admin.api_urls))

        api_urls += list(map(get_model_url, self._registry.items()))

        return api_urls

    def get_urls(self):
        from django.urls import include, path, re_path

        api_urls = self.get_api_urls()
        app_view = self.url_wrap(self.index, json=False)

        urlpatterns = [
            path('', app_view, name='index'),
            path('api/', include((api_urls, self.name), namespace='api')),
            path('login/', self.index, name='login'),
        ]

        def get_model_url(model):
            app_label = model._meta.app_label
            model_name = model._meta.model_name

            return re_path(rf'^{app_label}/{model_name}/(.*)', app_view)

        urlpatterns += list(map(get_model_url, self._registry.keys()))

        return urlpatterns

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
                'name': model._meta.model_name,
                'plural_name': capfirst(model._meta.verbose_name_plural),
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

    def get_user_avatar(self, user: Any) -> str:
        try:
            img = None

            if isinstance(self.user_avatar, str):
                return self.user_avatar

            if isinstance(self.user_avatar, Iterable):
                img = user

                for attr in self.user_avatar:
                    img = getattr(img, attr)

            elif callable(self.user_avatar):
                img = self.user_avatar(self, user)

            # not None and not str
            if img is not None and not isinstance(img, str):
                raise TypeError(f'unsupported image type {type(img)}')

            return img or self.default_avatar

        except Exception as e:
            logger.exception(e)
            logger.warning('an error happened while getting user_avatar')

        return self.default_avatar

    def index(self, request: HttpRequest, *args, **kwargs):
        context = {'base_url': self.base_url}
        return render(request, self.template, context)

    def api_user(self, request: HttpRequest):
        user = request.user

        response = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'avatar': self.get_user_avatar(user)
        }

        return JsonResponse(response)

    def api_index(self, request: HttpRequest):
        app_list = self.get_app_list(request)

        response = {
            'apps': app_list
        }

        return JsonResponse(response)

    def api_log(self, request: HttpRequest):
        try:
            from django.contrib.admin.models import LogEntry

            def get_date(datetime):
                return datetime.strftime('%Y-%m-%d %H:%M:%S')

            def GL(log: LogEntry):
                return {
                    'user': str(log.user),
                    'flag': log.action_flag,
                    'time': get_date(log.action_time),
                    'message': log.get_change_message(),
                    'repr': log.object_repr,
                    'url': None,
                    'content_type': log.content_type.name
                }

            logs = list(map(GL, LogEntry.objects.all()[:3]))

            return JsonResponse({'logs': logs})
        except E as e:
            return e.response

    def api_logout(self, request: HttpRequest):
        auth_logout(request)
        return JsonResponse({'message': 'Your Logout was Successful'})

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

            return JsonResponse({'message': 'Your Login was Successful!'})
        except E as e:
            return e.response

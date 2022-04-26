from functools import update_wrapper

from django.contrib import admin
from django.http import JsonResponse
from django.shortcuts import render


class AdminSite(admin.AdminSite):
    # name = 'black_night'
    template = 'black-knight.html'

    def __init__(self, name='black_night'):
        return super().__init__(name)

    def register(self, model_or_iterable, admin_class=None, **options):
        return super().register(
            model_or_iterable=model_or_iterable,
            admin_class=admin_class, **options
        )

    def get_urls(self):
        return super().get_urls()
        # Since this module gets imported in the application's root package,
        # it cannot import models from other applications at the module level,
        # and django.contrib.contenttypes.views imports ContentType.
        from django.contrib.contenttypes import views as contenttype_views
        from django.urls import include, path, re_path

        def wrap(view, cacheable=False):
            def wrapper(*args, **kwargs):
                return self.admin_view(view, cacheable)(*args, **kwargs)

            wrapper.admin_site = self
            return update_wrapper(wrapper, view)

        # Admin-site-wide views.
        urlpatterns = [
            path("", wrap(self.index), name="index"),
            path("login/", self.login, name="login"),
            path("logout/", wrap(self.logout), name="logout"),
            path(
                "password_change/",
                wrap(self.password_change, cacheable=True),
                name="password_change",
            ),
            path(
                "password_change/done/",
                wrap(self.password_change_done, cacheable=True),
                name="password_change_done",
            ),
            path("autocomplete/", wrap(self.autocomplete_view), name="autocomplete"),
            path("jsi18n/", wrap(self.i18n_javascript,
                 cacheable=True), name="jsi18n"),
            path(
                "r/<int:content_type_id>/<path:object_id>/",
                wrap(contenttype_views.shortcut),
                name="view_on_site",
            ),
        ]

        # Add in each model's views, and create a list of valid URLS for the
        # app_index
        valid_app_labels = []
        for model, model_admin in self._registry.items():
            urlpatterns += [
                path(
                    "%s/%s/" % (model._meta.app_label, model._meta.model_name),
                    include(model_admin.urls),
                ),
            ]
            if model._meta.app_label not in valid_app_labels:
                valid_app_labels.append(model._meta.app_label)

        # If there were ModelAdmins registered, we should have a list of app
        # labels for which we need to allow access to the app_index view,
        if valid_app_labels:
            regex = r"^(?P<app_label>" + "|".join(valid_app_labels) + ")/$"
            urlpatterns += [
                re_path(regex, wrap(self.app_index), name="app_list"),
            ]

        if self.final_catch_all_view:
            urlpatterns.append(
                re_path(r"(?P<url>.*)$", wrap(self.catch_all_view)))

        return urlpatterns

    # @property
    # def urls(self):
    #     return self.get_urls(), 'black_night', self.name

    # def admin_view(self, view, *args, **kwargs):

    #     @csrf_protect
    #     def inner(request, *args, **kwargs):
    #         if not self.has_permission(request):
    #             return redirect_to_login(
    #                 request.get_full_path(),
    #                 reverse('black_night:login', current_app=self.name),
    #             )

    #             # if request.path == reverse('black_night:logout', current_app=self.name):
    #             #     index_path = reverse('black_night:index', current_app=self.name)
    #             #     return HttpResponseRedirect(index_path)

    #         return view(request, *args, **kwargs)

    #     return inner

    def index(self, request):
        return render(request, self.template)

    def index_api(self, request):
        return JsonResponse({'index': 'api'})

    # def login(self, request):
    #     sys_logout(request)
    #     return JsonResponse({'login page': True})

    # def logout(self, request):
    #     sys_logout(request)
    #     return HttpResponseRedirect('/')

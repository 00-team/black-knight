# http
from django.http import HttpRequest, HttpResponseRedirect, JsonResponse

# urls
from django.urls import path, reverse

# auth
from django.contrib.auth.views import redirect_to_login
from django.contrib.auth import logout as sys_logout

# decorators
from django.views.decorators.csrf import csrf_protect

# shortcuts
from django.shortcuts import render


class AdminSite:
    name = 'black_night'
    template = 'black-night.html'

    def get_urls(self):
        urlpatterns = [
            path('', self.admin_view(self.index), name='index'),
            path('login/', self.login, name='login'),
            path('logout/', self.logout, name='logout'),
        ]

        return urlpatterns

    @property
    def urls(self):
        return self.get_urls(), 'black_night', self.name

    def has_permission(self, request: HttpRequest):
        return request.user.is_active and request.user.is_staff

    def admin_view(self, view):

        @csrf_protect
        def inner(request, *args, **kwargs):
            if not self.has_permission(request):
                return redirect_to_login(
                    request.get_full_path(),
                    reverse('black_night:login', current_app=self.name),
                )

                # if request.path == reverse('black_night:logout', current_app=self.name):
                #     index_path = reverse('black_night:index', current_app=self.name)
                #     return HttpResponseRedirect(index_path)

            return view(request, *args, **kwargs)

        return inner

    def index(self, request):
        return render(request, self.template)

    def login(self, request):
        sys_logout(request)
        return JsonResponse({'login page': True})

    def logout(self, request):
        sys_logout(request)
        return HttpResponseRedirect('/')


site = AdminSite()

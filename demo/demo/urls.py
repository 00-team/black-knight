from Blog.views import blogs
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic.base import RedirectView


favicon = RedirectView.as_view(
    url=settings.STATIC_URL + 'favicon.ico',
    permanent=True
)

urlpatterns = [
    path('', blogs, name='blogs'),
    path('admin/', admin.site.urls),
    path('favicon.ico', favicon),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

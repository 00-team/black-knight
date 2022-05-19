from black_knight.admin import ModelAdmin
from django.conf import settings


class GroupAdmin(ModelAdmin):
    icon = settings.STATIC_URL + 'favicon.ico'


class UserAdmin(ModelAdmin):
    pass

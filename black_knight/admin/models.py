from black_knight.admin import ModelAdmin
from django.conf import settings


class GroupAdmin(ModelAdmin):
    icon = settings.STATIC_URL + '12'


class UserAdmin(ModelAdmin):
    pass

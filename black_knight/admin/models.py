from black_knight.admin import ModelAdmin
from django.conf import settings


class GroupAdmin(ModelAdmin):
    icon = settings.STATIC_URL + 'favicon.ico'


class UserAdmin(ModelAdmin):
    list_display = 'username', 'email', 'first_name', 'last_name', 'is_staff'
    list_filter = 'is_staff', 'is_superuser', 'is_active', 'groups'
    search_fields = 'username', 'first_name', 'last_name', 'email'
    ordering = 'username',
    filter_horizontal = (
        'groups',
        'user_permissions',
    )

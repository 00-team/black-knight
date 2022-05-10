from django.contrib.admin.apps import AdminConfig


class BlackNightAdmin(AdminConfig):
    default_site = 'black_knight.admin.AdminSite'

from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class BlackNightApp(AppConfig):
    name = 'black_knight'


class BlackNightAdmin(AdminConfig):
    default_site = 'black_knight.admin.AdminSite'

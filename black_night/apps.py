from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class BlackNightConfig(AppConfig):
    name = 'black_night'


class BlackNightAdmin(AdminConfig):
    default_site = 'black_night.admin.BlackNightAdmin'

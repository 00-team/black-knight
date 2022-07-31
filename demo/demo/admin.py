from black_knight.admin import AdminSite
from django.contrib.admin.apps import AdminConfig


class DemoAdmin(AdminSite):
    user_avatar = 'account', 'photo', 'url'


class DemoAdminApp(AdminConfig):
    default_site = 'demo.admin.DemoAdmin'

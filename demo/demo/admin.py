from black_knight.admin import AdminSite
from django.contrib.admin.apps import AdminConfig


class DemoAdmin(AdminSite):
    pass


class DemoAdminApp(AdminConfig):
    default_site = 'demo.admin.DemoAdmin'

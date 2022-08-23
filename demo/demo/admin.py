from black_knight.admin import AdminSite
from django.contrib.admin.apps import AdminConfig


class KnightAdmin(AdminSite):
    user_avatar = 'account', 'photo', 'url'


knight = KnightAdmin()

# class DemoAdminApp(AdminConfig):
#     default_site = 'demo.admin.DemoAdmin'

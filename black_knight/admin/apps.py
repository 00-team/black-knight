from django.contrib.admin.apps import AdminConfig


class BlackNightAdmin(AdminConfig):
    default_site = 'black_knight.admin.AdminSite'

    def ready(self):

        return super().ready()

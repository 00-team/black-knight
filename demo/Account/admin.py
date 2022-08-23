from black_knight.admin import ModelAdmin
from demo.admin import knight
from django.contrib import admin

from .models import Account, AccountTemp


class AccountAdmin(ModelAdmin):
    list_display = 'user', '__str__', 'nickname'


class AccountTempAdmin(ModelAdmin):
    list_display = 'name',


knight.register(Account, AccountAdmin)
knight.register(AccountTemp, AccountTempAdmin)

admin.site.register(Account, AccountAdmin)
admin.site.register(AccountTemp, AccountTempAdmin)

from black_knight.admin import ModelAdmin
from django.contrib import admin

from .models import Account


@admin.register(Account)
class AccountAdmin(ModelAdmin):
    list_display = 'user', '__str__', 'nickname'

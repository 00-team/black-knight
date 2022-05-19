from black_knight.admin import ModelAdmin
from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(ModelAdmin):
    pass

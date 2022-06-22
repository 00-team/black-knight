from black_knight.admin import ModelAdmin
from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(ModelAdmin):
    fieldsets = (
        ('Content', {'fields': ('title', 'description')}),
        ('Image', {'fields': ('thumbnail', '_thumbnail')}),
    )
    readonly_fields = ('_thumbnail',)

    @admin.display
    def _thumbnail(self, obj):
        return obj.thumbnail.url

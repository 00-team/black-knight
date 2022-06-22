from black_knight.admin import ModelAdmin
from django.contrib import admin

from .models import Blog


@admin.register(Blog)
class BlogAdmin(ModelAdmin):
    fieldsets = (
        ('Content', {'fields': ('title', 'description')}),
        ('Image', {'fields': ('thumbnail', '_thumbnail')}),
        ('Times', {'fields': ('publish_date', 'study_time')})
    )
    readonly_fields = '_thumbnail',
    list_filter = 'publish_date', 'study_time'

    @admin.display
    def _thumbnail(self, obj):
        return obj.thumbnail.url

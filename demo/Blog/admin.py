from black_knight.admin import ModelAdmin
from django.contrib import admin

from .models import Blog


@admin.action(description='Set Blog Title To Maniac')
def blog_title(modeladmin, request, queryset):
    queryset.update(title='Maniac')


@admin.register(Blog)
class BlogAdmin(ModelAdmin):
    fieldsets = (
        ('Content', {'fields': ('title', 'description')}),
        ('Image', {'fields': ('thumbnail', '_thumbnail')}),
        ('Times', {'fields': ('publish_date', 'study_time')})
    )
    actions = blog_title,
    readonly_fields = '_thumbnail', '_study_time'
    list_filter = 'publish_date', 'study_time'
    list_display = 'title', '_study_time', 'thumbnail'
    ordering = '-publish_date',
    date_hierarchy = 'publish_date'

    @admin.display
    def _thumbnail(self, obj):
        return obj.thumbnail.url

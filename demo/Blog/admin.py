from black_knight.admin import ModelAdmin
from demo.admin import knight
from django.contrib import admin
from django.utils.html import format_html

from .models import Blog


@admin.action(description='Set Blog Title To Maniac')
def blog_title(modeladmin, request, queryset):
    queryset.update(title='Maniac')


class BlogAdmin(ModelAdmin):
    fieldsets = (
        ('Content', {'fields': ('title', 'content', 'description')}),
        ('Image', {'fields': ('thumbnail', '_thumbnail')}),
        ('Times', {'fields': ('publish_date', 'study_time')})
    )
    actions = blog_title,
    readonly_fields = '_thumbnail', '_study_time'
    list_per_page = 10
    list_filter = 'publish_date', 'study_time'
    list_display = 'title', '_thumbnail', '_study_time', 'thumbnail'
    ordering = '-publish_date',
    date_hierarchy = 'publish_date'

    @admin.display
    def _thumbnail(self, obj):
        return format_html('<span>value from _thumbnail</span>')
        # return obj.thumbnail.url


admin.site.register(Blog, BlogAdmin)
knight.register(Blog, BlogAdmin)

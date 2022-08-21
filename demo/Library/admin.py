from black_knight.admin import ModelAdmin
from django.contrib import admin

from Library.models import AllFields, Author, Book


@admin.register(AllFields)
class AllFieldsAdmin(ModelAdmin):
    # readonly_fields = 'many_2_many',
    pass


@admin.register(Book)
class BookAdmin(ModelAdmin):
    search_fields = 'title', 'author__name'
    search_help_text = 'Search for Titles and Authors'
    list_display = (
        'title', 'author', 'targeted_group',
        'is_nsfw', 'publish_date', 'cover', 'pages'
    )


@admin.register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = 'name', 'age'
    ordering = 'age', 'name'

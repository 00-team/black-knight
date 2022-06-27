from black_knight.admin import ModelAdmin
from django.contrib import admin

from Library.models import Author, Book


@admin.register(Book)
class BookAdmin(ModelAdmin):
    list_display = (
        'title', 'author', 'targeted_group',
        'is_nsfw', 'publish_date', 'cover'
    )


@admin.register(Author)
class AuthorAdmin(ModelAdmin):
    list_display = 'name', 'age'

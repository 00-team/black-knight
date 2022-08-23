from black_knight.admin import ModelAdmin
from demo.admin import knight
from django.contrib import admin

from Library.models import AllFields, Author, Book


class AllFieldsAdmin(ModelAdmin):
    # readonly_fields = 'many_2_many',
    pass


class BookAdmin(ModelAdmin):
    search_fields = 'title', 'author__name'
    search_help_text = 'Search for Titles and Authors'
    list_display = (
        'title', 'author', 'targeted_group',
        'is_nsfw', 'publish_date', 'cover', 'pages'
    )


class AuthorAdmin(ModelAdmin):
    list_display = 'name', 'age'
    ordering = 'age', 'name'


knight.register(AllFields, AllFieldsAdmin)
knight.register(Book, BookAdmin)
knight.register(Author, AuthorAdmin)

admin.site.register(AllFields, AllFieldsAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)

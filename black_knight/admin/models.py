from django.contrib import admin


class ModelAdmin(admin.ModelAdmin):
    change_form_template = 'black-knight.html'

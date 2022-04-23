from django.contrib import admin


class BlackNightAdmin(admin.AdminSite):
    site_header = 'Black Night Admin'
    site_title = ''
    index_title = 'Black Night Admin'
    empty_value_display = '-empty-'
    index_template = 'black-night.html'
    app_index_template = 'black-night.html'


class BlackNightModel(admin.ModelAdmin):
    change_form_template = 'black-night.html'

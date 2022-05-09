from django.contrib import admin


class ModelAdmin(admin.ModelAdmin):
    icon: str | None = None

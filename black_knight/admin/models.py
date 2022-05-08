from django.contrib import admin


default_icon = 'default icon admin'


class ModelAdmin(admin.ModelAdmin):
    # change_form_template = 'black-knight.html'
    icon: str | None = None

    @property
    def get_icon(self) -> str:
        if self.icon is None:
            return default_icon

        return self.icon

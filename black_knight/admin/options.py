from django.contrib import admin
# from django.contrib.admin.utils import flatten_fieldsets
from django.contrib.admin.utils import label_for_field, lookup_field
from django.http import HttpRequest, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET


require_GET_m = method_decorator(require_GET)


class ModelAdmin(admin.ModelAdmin):
    icon: str | None = None

    def get_bracelist(self, request, **kwargs):
        """
        Return the BraceList class for use on the changelist page.
        """
        from django.contrib.admin.views.main import ChangeList

        return ChangeList

    @require_GET_m
    def bracelist(self, request: HttpRequest):
        '''display list of instances in the brace'''

        # fieldsets = self.get_fieldsets(request)

        # print(flatten_fieldsets(fieldsets))
        # print(fieldsets)

        list_display = self.get_list_display(request)
        queryset = self.get_queryset(request)

        instance_labels = map(
            lambda f: label_for_field(f, self.model, self),
            list_display
        )

        def get_instance(instance):
            field = []

            for field_name in list_display:
                *_, value = lookup_field(field_name, instance, self)
                field.append(str(value))

            return field

        instances = list(map(get_instance, queryset))

        response = {
            'instances': instances,
            'instance_labels': list(instance_labels)
        }

        return JsonResponse(response)

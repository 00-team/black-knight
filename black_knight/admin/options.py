from django.contrib import admin
# from django.contrib.admin.utils import flatten_fieldsets
from django.contrib.admin.utils import label_for_field, lookup_field
from django.http import HttpRequest, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET


require_GET_m = method_decorator(require_GET)


class ModelAdmin(admin.ModelAdmin):
    icon: str | None = None

    def get_api_urls(self):
        from django.urls import path

        wrap = self.admin_site.url_wrap

        return [
            path('bracelist/', wrap(self.bracelist)),
            path('braceinfo/', wrap(self.braceinfo))
        ]

    @property
    def api_urls(self):
        return self.get_api_urls()

    def get_bracelist_instance(self, request):
        '''
        Return a `BraceList` instance based on `request`. 
        May raise `IncorrectLookupParameters`.
        '''
        from black_knight.admin.views.main import BraceList

        return BraceList(request, self)

    @require_GET_m
    def bracelist(self, request: HttpRequest):
        '''display list of instances in the brace'''

        brace_list = self.get_bracelist_instance(request)

        return JsonResponse(brace_list.response)

    @require_GET_m
    def braceinfo(self, request: HttpRequest):
        '''bracelist info'''

        list_display = self.get_list_display(request)
        root_queryset = self.get_queryset(request)
        actions = self.get_action_choices(request, [])

        response = {
            'preserve_filters': self.preserve_filters,
            'show_search': bool(self.get_search_fields(request)),
            'search_help_text': self.search_help_text,
            'full_result_count': None,
            'empty_value_display': self.get_empty_value_display(),
        }

        # actions
        actions = [{'name': a[0], 'description': a[1]} for a in actions]
        response['actions'] = actions or None

        # headers
        def get_label(field):
            label = label_for_field(
                field,
                self.model,
                self
            )
            return label.strip()

        response['headers'] = list(map(get_label, list_display))

        if self.show_full_result_count:
            response['full_result_count'] = root_queryset.count()

        return JsonResponse(response)

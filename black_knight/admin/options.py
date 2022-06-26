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
            path('bracelist/', wrap(self.bracelist))
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

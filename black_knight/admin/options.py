from black_knight.admin.utils import get_data
from black_knight.admin.utils.exception import INVALID_INPUT, ErrorResponse
from django.contrib import admin
# from django.contrib.admin.utils import flatten_fieldsets
from django.contrib.admin.utils import label_for_field, lookup_field
from django.core.paginator import InvalidPage
from django.http import HttpRequest, JsonResponse
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET, require_POST


require_GET_m = method_decorator(require_GET)
require_POST_m = method_decorator(require_POST)


class ModelAdmin(admin.ModelAdmin):
    icon: str | None = None

    def get_api_urls(self):
        from django.urls import path

        wrap = self.admin_site.url_wrap

        return [
            path('brace-result/', wrap(self.brace_result)),
            path('brace-info/', wrap(self.brace_info)),
            path('brace-actions/', wrap(self.brace_actions))
        ]

    @property
    def api_urls(self):
        return self.get_api_urls()

    def get_braceresult_instance(self, request):
        '''
        Return a `BraceResult` instance based on `request`. 
        May raise `IncorrectLookupParameters`.
        '''
        from black_knight.admin.views.main import BraceResult

        return BraceResult(request, self)

    def brace_result(self, request: HttpRequest):
        '''display list of instances in the brace'''
        try:
            brace_result = self.get_braceresult_instance(request)

            return JsonResponse(brace_result.response)
        except InvalidPage:
            return ErrorResponse('Invalid Page', 400)

    def get_orders(self):
        meta = self.model._meta
        orders = []

        for field in meta.fields:
            if field.remote_field:
                for remote_field in field.related_model._meta.fields:
                    if not remote_field.remote_field:
                        orders.append(f'{field.name}__{remote_field.name}')
            else:
                orders.append(field.name)

        return orders

    @require_GET_m
    def brace_info(self, request: HttpRequest):
        '''Brace Info'''
        get_token(request)
        list_display = self.get_list_display(request)
        root_queryset = self.get_queryset(request)
        actions = self.get_action_choices(request, [])

        # func = self.get_actions(request)['delete_selected'][0]

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
        response['orders'] = self.get_orders()

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

    @require_POST_m
    def brace_actions(self, request: HttpRequest):
        data = get_data(request)
        items = data.get('items', [])
        action = self.get_actions(request).get(data.get('action'))

        if not action or not items:
            return INVALID_INPUT
        if items != 'all' and not isinstance(items, list):
            return INVALID_INPUT

        queryset = self.model._default_manager.get_queryset()
        if isinstance(items, list):
            queryset = queryset.filter(pk__in=items)

        if not queryset:
            return ErrorResponse('Items not found', 404)

        # action = (func, name, desc)
        action[0](self, request, queryset)

        return JsonResponse({'ok': 'action executed successfully'})

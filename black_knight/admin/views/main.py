
from black_knight.admin.options import ModelAdmin
from black_knight.admin.utils.brace import value_dict
from django.contrib.admin.utils import label_for_field, lookup_field
from django.db.models import QuerySet
from django.http import HttpRequest


# ORDER_VAR = 'o'
# PAGE_VAR = 'p'
# SEARCH_VAR = 'q'


class BraceList:

    request: HttpRequest
    response: dict
    model_admin: ModelAdmin
    root_queryset: QuerySet
    queryset: QuerySet

    def __init__(self, request, model_admin) -> None:
        self.model_admin = model_admin
        self.request = request

        # self.params = dict(request.GET.items())
        # self.list_filter = model_admin.get_list_filter(request)
        # self.list_per_page = model_admin.list_per_page
        # self.list_editable = model_admin.list_editable
        # self.search_fields = model_admin.get_search_fields(request)
        # self.date_hierarchy = model_admin.date_hierarchy

        self.root_queryset = model_admin.get_queryset(request)
        self.response = {
            'preserve_filters': model_admin.preserve_filters,
            'search_help_text': model_admin.search_help_text,
            'full_result_count': None
        }

        self.get_queryset()
        self.get_response()

    def get_actions(self):
        '''add the actions into the response'''

        actions = self.model_admin.get_action_choices(self.request, [])
        actions = [{'name': a[0], 'description': a[1]} for a in actions]
        self.response['actions'] = actions or None

    def get_queryset(self):
        '''filter and order and search the queryset'''
        self.queryset = self.root_queryset

    def get_headers(self):
        '''get the result headers'''

        list_display = self.model_admin.get_list_display(self.request)

        def get_label(field):
            label = label_for_field(
                field,
                self.model_admin.model,
                self.model_admin
            )
            return label.strip()

        self.response['headers'] = list(map(get_label, list_display))

    def get_results(self):
        '''loop over the queryset and get the objects'''

        model_admin = self.model_admin
        list_display = model_admin.get_list_display(self.request)
        empty = model_admin.get_empty_value_display()

        def get_row(obj):
            row = [obj.pk]

            for field_name in list_display:
                field, attr, value = lookup_field(field_name, obj, model_admin)
                local_empty = getattr(attr, 'empty_value_display', empty)
                row.append(value_dict(field, value, local_empty))

            return row

        results = map(get_row, self.queryset)
        self.response['results'] = list(results)

    def get_response(self):
        '''setup the response'''
        self.get_actions()
        self.get_headers()
        self.get_results()

        if self.model_admin.show_full_result_count:
            self.response['full_result_count'] = self.root_queryset.count()

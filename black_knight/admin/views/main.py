
from black_knight.admin.options import ModelAdmin
from black_knight.admin.utils.brace import value_dict
from django.contrib.admin.utils import lookup_field
from django.db.models import Exists, OuterRef, QuerySet
from django.http import HttpRequest


ORDER_VAR = 'o'
PAGE_VAR = 'p'
SEARCH_VAR = 'q'


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
        self.response = {}

        self.get_queryset()
        self.get_response()

    def apply_search(self, qs) -> tuple:
        '''apply search result and return the queryset'''
        request = self.request
        model_admin = self.model_admin

        query = request.GET.get(SEARCH_VAR)
        enabled = model_admin.get_search_fields(request)

        if enabled and query:
            return model_admin.get_search_results(
                request,
                qs,
                query,
            )

        return qs, False

    def get_queryset(self):
        '''filter and order and search the queryset'''
        qs = self.root_queryset

        # filters
        filters_have_duplicated = False

        # search
        qs, search_have_duplicated = self.apply_search(qs)

        # order

        # duplication check
        if filters_have_duplicated | search_have_duplicated:
            qs = qs.filter(pk=OuterRef('pk'))
            qs = self.root_queryset.filter(Exists(qs))

        self.queryset = qs

    def get_results(self):
        '''loop over the queryset and get the objects'''

        model_admin = self.model_admin
        list_display = model_admin.get_list_display(self.request)

        def get_row(obj):
            row = [obj.pk]

            for field_name in list_display:
                field, _, value = lookup_field(field_name, obj, model_admin)
                row.append(value_dict(field, value))

            return row

        results = map(get_row, self.queryset)
        self.response['results'] = list(results)

    def get_response(self):
        '''setup the response'''
        self.get_results()

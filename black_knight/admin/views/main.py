
from black_knight.admin.options import ModelAdmin
from black_knight.admin.utils import get_data
from black_knight.admin.utils.brace import value_dict
from django.contrib.admin.utils import lookup_field
from django.db.models import Exists, OuterRef, QuerySet
from django.http import HttpRequest, QueryDict


def _page_num(data: QueryDict):
    try:
        return int(data.get('page', 1))
    except ValueError:
        return 1


class BraceResult:

    request: HttpRequest
    response: dict
    model_admin: ModelAdmin
    root_queryset: QuerySet
    queryset: QuerySet
    data: QueryDict

    def __init__(self, request, model_admin) -> None:
        self.model_admin = model_admin
        self.request = request
        self.data = get_data(request)

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

    def apply_search(self, qs) -> tuple[QuerySet, bool]:
        '''apply search result and return the queryset'''

        search_term = self.data.get('search')
        enabled = self.model_admin.get_search_fields(self.request)

        if enabled and isinstance(search_term, str):
            return self.model_admin.get_search_results(
                self.request, qs, search_term,
            )

        return qs, False

    def apply_orders(self, qs) -> QuerySet:
        return qs.order_by('-pk')

    def get_queryset(self):
        '''filter and order and search the queryset'''
        qs = self.root_queryset

        # filters
        filters_have_duplicated = False

        # search
        qs, search_have_duplicated = self.apply_search(qs)

        # order
        qs = self.apply_orders(qs)

        # duplication check
        if filters_have_duplicated | search_have_duplicated:
            qs = qs.filter(pk=OuterRef('pk'))
            qs = self.root_queryset.filter(Exists(qs))

        self.queryset = qs

    def get_results(self):
        '''loop over the queryset and get the objects'''

        model_admin = self.model_admin
        request = self.request
        list_display = model_admin.get_list_display(request)
        list_per_page = model_admin.list_per_page

        paginator = model_admin.get_paginator(
            request, self.queryset, list_per_page
        )

        result_count = paginator.count

        if result_count > list_per_page:
            result_list = paginator.page(_page_num(self.data)).object_list
        else:
            result_list = self.queryset._clone()

        def get_row(obj):
            row = [obj.pk]

            for field_name in list_display:
                field, _, value = lookup_field(field_name, obj, model_admin)
                row.append(value_dict(field, value))

            return row

        results = map(get_row, result_list)
        self.response['results'] = list(results)

    def get_response(self):
        '''setup the response'''
        self.get_results()


from black_knight.admin.options import ModelAdmin
from black_knight.admin.utils import field_value, get_data
from django.contrib.admin.utils import lookup_field
from django.core.exceptions import FieldDoesNotExist
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
    orders: list[str]

    def __init__(self, request, model_admin) -> None:
        self.model_admin = model_admin
        self.request = request
        self.data = get_data(request)

        # self.list_filter = model_admin.get_list_filter(request)
        # self.list_editable = model_admin.list_editable
        # self.date_hierarchy = model_admin.date_hierarchy

        self.root_queryset = model_admin.get_queryset(request)
        self.response = {}
        self.orders = model_admin.get_orders()

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

    def get_orders(self) -> list[str] | None:
        orders = self.data.get('orders')
        if not orders or not isinstance(orders, list):
            return

        def get_field(field):
            field = str(field).lstrip('-')
            return field == 'pk' or field in self.orders

        return list(filter(get_field, orders))

    def apply_orders(self, qs: QuerySet) -> QuerySet:

        ordering = self.get_orders() or qs.query.order_by

        if not ordering:
            ordering = ['-pk']

        if ordering != qs.query.order_by:
            qs = qs.order_by(*ordering)

        ordered_by = list(map(lambda f: f, ordering))
        self.response['ordered_by'] = ordered_by

        return qs

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
        self.response['result_count'] = result_count

        if result_count > list_per_page:
            page = _page_num(self.data)
            result_list = paginator.page(page).object_list
            self.response['page'] = {
                'current': page,
                'max': paginator.num_pages
            }
        else:
            result_list = self.queryset._clone()
            self.response['page'] = None

        def get_row(obj):
            row = [obj.pk]

            for field_name in list_display:
                field, _, value = lookup_field(field_name, obj, model_admin)
                value = field_value(field, value)
                row.append(value.display)

            return row

        results = map(get_row, result_list)
        self.response['results'] = list(results)

    def get_response(self):
        '''setup the response'''
        self.get_results()

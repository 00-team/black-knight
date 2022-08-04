from black_knight.admin.utils import INVALID_INPUT, ErrorResponse
from black_knight.admin.utils import construct_instance, display_value
from black_knight.admin.utils import get_data
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets, label_for_field
from django.contrib.admin.utils import lookup_field
from django.core.exceptions import FieldDoesNotExist, ValidationError
from django.core.paginator import InvalidPage
from django.db import models
# from django.db.models.fields.related import ForeignObjectRel, ManyToManyRel
# from django.db.models.fields.related import OneToOneField
from django.http import HttpRequest, JsonResponse, QueryDict
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_GET, require_POST


require_GET_m = method_decorator(require_GET)
require_POST_m = method_decorator(require_POST)


class ModelAdmin(admin.ModelAdmin):
    icon: str | None = None

    def get_api_urls(self):
        from django.urls import path, re_path

        wrap = self.admin_site.url_wrap

        return [
            path('brace-result/', wrap(self.brace_result)),
            path('brace-info/', wrap(self.brace_info)),
            path('brace-actions/', wrap(self.brace_actions)),

            re_path('brace-form/(add|change)/', wrap(self.brace_form)),
            re_path('brace-form-submit/(add|change)/',
                    wrap(self.brace_form_submit))
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

    def brace_form(self, request: HttpRequest, form_type: str):
        fieldsets = []
        base_fieldsets = self.get_fieldsets(request)
        readonly_fields = self.get_readonly_fields(request)
        meta = self.model._meta
        instance = None
        response = {}

        # default type is add
        if form_type == 'change':
            pk = get_data(request).get('pk')
            instance = self.get_object(request, pk)
            if instance is None:
                return INVALID_INPUT

        def get_field(field_name):

            if field_name in readonly_fields:
                return {
                    'type': 'readonly',
                    'name': field_name,
                    'label': field_name.replace('_', ' ')
                }

            field = meta.get_field(field_name)
            info = getattr(field, 'info', {
                'type': 'unknown',
                'name': field.name,
                'label': field.verbose_name,
            })

            return info

        def get_field_value(field_dict: dict):
            field, _, value = lookup_field(field_dict['name'], instance, self)

            # if field.remote_field and value:
            #     if isinstance(field.remote_field, ManyToManyRel):
            #         field_dict['value'] = ', '.join(map(str, value.all()))
            #         return field_dict
            #     elif isinstance(field.remote_field, (ForeignObjectRel, OneToOneField)):
            #         field_dict['value'] = get_remote_url(field, value)
            #         return field_dict

            field_dict['value'] = display_value(field, value)
            return field_dict

        for fieldset in base_fieldsets:
            fields = map(get_field, fieldset[1]['fields'])

            if instance:
                fields = map(get_field_value, fields)

            fieldsets.append({
                'name': fieldset[0],
                'description': fieldset[1].get('description'),
                'fields': list(fields),
            })

        response['fieldsets'] = fieldsets
        response['label'] = str(instance) if instance else None

        return JsonResponse(response)

    @require_POST_m
    def brace_form_submit(self, request: HttpRequest, form_type: str):
        data = request.POST.copy()
        data.update(request.FILES)
        change = form_type == 'change'

        if change:
            instance = self.get_object(request, data.get('pk'))
            if instance is None:
                return INVALID_INPUT
        else:
            instance = self.model()

        instance, errors = construct_instance(instance, data, change)

        if errors:
            return JsonResponse({
                'message': 'Value Errors',
                'fields': errors,
                'code': 400
            }, status=400)
        else:
            instance.save()

        # TODO: better messages
        return JsonResponse({'message': 'success', 'pk': instance.pk})

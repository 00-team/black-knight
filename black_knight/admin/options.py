from black_knight.admin.utils import ErrorResponse, construct_instance
from black_knight.admin.utils import field_value, get_data
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets, label_for_field
from django.contrib.admin.utils import lookup_field
from django.core.exceptions import FieldDoesNotExist, PermissionDenied
from django.core.exceptions import ValidationError
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

PERMISSION_DENIED = ErrorResponse('Permission Denied', 403)


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
            re_path(
                'brace-form-submit/(add|change|delete)/',
                wrap(self.brace_form_submit)
            )
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

        if not self.has_view_or_change_permission(request):
            return PERMISSION_DENIED

        try:
            brace_result = self.get_braceresult_instance(request)

            return JsonResponse(brace_result.response)
        except InvalidPage:
            return ErrorResponse('Invalid Page', status=400)

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

        if not self.has_view_or_change_permission(request):
            return PERMISSION_DENIED

        get_token(request)
        list_display = self.get_list_display(request)
        root_queryset = self.get_queryset(request)
        actions = self.get_action_choices(request, [])

        response = {
            'preserve_filters': self.preserve_filters,
            'show_search': bool(self.get_search_fields(request)),
            'search_help_text': self.search_help_text,
            'full_result_count': None,
            'empty_value_display': self.get_empty_value_display(),
            'perms': self.get_model_perms(request),
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

        if not action:
            return ErrorResponse('No Action was Selected')
        if not items:
            return ErrorResponse('No Item was Selected')
        if items != 'all' and not isinstance(items, list):
            return ErrorResponse('Items are invalid')

        queryset = self.model._default_manager.get_queryset()
        if isinstance(items, list):
            queryset = queryset.filter(pk__in=items)

        if not queryset:
            return ErrorResponse('Items not found', 404)

        # action = (func, name, desc)
        action[0](self, request, queryset)

        return JsonResponse({'message': 'action executed successfully'})

    def brace_form(self, request: HttpRequest, form_type: str):
        fieldsets = []
        base_fieldsets = self.get_fieldsets(request)
        readonly_fields = self.get_readonly_fields(request)
        meta = self.model._meta
        instance = None
        response = {
            'perms': self.get_model_perms(request)
        }

        # default type is add
        if form_type == 'change':
            if not self.has_view_or_change_permission(request):
                return PERMISSION_DENIED
            pk = get_data(request).get('pk')
            instance = self.get_object(request, pk)
            if instance is None:
                return ErrorResponse('instance not found', 404)
        else:
            if not self.has_add_permission(request):
                return PERMISSION_DENIED

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
            if 'value' in field_dict:
                return field_dict

            field, _, value = lookup_field(field_dict['name'], instance, self)
            value = field_value(field, value)

            if not self.has_change_permission(request):
                # view only
                field_dict['type'] = 'readonly'
                field_dict['value'] = value.display
                return field_dict

            if field_dict['type'] == 'readonly':
                field_dict['value'] = value.display
            else:
                field_dict['value'] = value.value

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
        data = request.GET.copy()
        data.update(request.POST)
        data.update(request.FILES)
        change = form_type == 'change'
        delete = form_type == 'delete'
        add = form_type == 'add'

        if (
            (delete and not self.has_delete_permission(request)) or
            (change and not self.has_change_permission(request)) or
            (add and not self.has_add_permission(request))
        ):
            return PERMISSION_DENIED

        if change or delete:
            instance = self.get_object(request, data.get('pk'))
            if instance is None:
                return ErrorResponse('instance not found', 404)
        else:
            instance = self.model()

        if delete:
            instance.delete()
            return JsonResponse({'message': 'instance successfully deleted'})

        instance, errors, save_m2m = construct_instance(instance, data, change)

        if errors:
            return ErrorResponse('check the fields', data={'fields': errors})
        else:
            instance.save()
            m2m_errors = save_m2m()
            if m2m_errors:
                return ErrorResponse('check the fields', data={'fields': m2m_errors})
            instance.save()

        # TODO: better messages
        return JsonResponse({'pk': instance.pk})

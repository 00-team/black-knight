import datetime
import decimal
import json
from itertools import chain

from black_knight.fields import ForeignKey, ManyToManyField
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Field as ModelField
from django.urls import NoReverseMatch, reverse
from django.utils import formats, timezone


def get_remote_url(field, value):
    meta = field.remote_field.model._meta
    app_label = meta.app_label
    model_name = meta.model_name

    try:
        url = reverse('black_knight:index', current_app='black_knight')
        url += f'{app_label}/{model_name}/change/{value.pk}/'
        return 'link', url
    except NoReverseMatch:
        str(value)


def display_value(field, value):

    if field:
        if getattr(field, 'flatchoices', None):
            return value
            # return dict(field.flatchoices).get(value)

        elif isinstance(field, models.ImageField):
            return 'image', value.url if value else None

        elif isinstance(field, models.FileField):
            return 'file', value.url if value else None

        elif isinstance(field, models.ForeignKey):
            return 'foreign_key', value.pk, str(value)

        elif isinstance(field, models.ManyToManyField):
            return 'many_to_many', [i.pk for i in value.get_queryset()]

        elif isinstance(field, models.JSONField) and value:
            try:
                return json.dumps(value, ensure_ascii=False, cls=field.encoder)
            except TypeError:
                return str(value)

    if value is None:
        return None

    if value == '':
        return None

    if isinstance(value, bool):
        return value

    if isinstance(value, datetime.datetime):
        return 'datetime', value.replace(microsecond=0).isoformat()

    if isinstance(value, datetime.date):
        return 'date', value.isoformat()
        # return formats.localize(timezone.template_localtime(value))

    if isinstance(value, datetime.time):
        # TODO: return an iso format version of it
        return 'time', value.isoformat()

    if isinstance(value, (int, decimal.Decimal, float)):
        return value
        # return formats.number_format(value)

    if isinstance(value, (list, tuple)):
        return ', '.join(str(v) for v in value)

    return str(value)


def construct_instance(instance, data, change, include=None, exclude=None):

    opts = instance._meta
    file_field_list = []
    errors = {}

    private_fields = [
        f for f in opts.private_fields if isinstance(f, ModelField)
    ]
    fields = chain(opts.concrete_fields, private_fields, opts.many_to_many)

    for field in fields:
        f_name = 'F_' + field.name
        if (
            not field.editable
            or isinstance(field, models.AutoField)
            # or f_name not in data
        ):
            continue
        if include is not None and field.name not in include:
            continue
        if exclude and field.name in exclude:
            continue
        if change and not f_name in data:
            continue

        initial = field.get_default()
        value = data.get(f_name, initial)

        try:
            if isinstance(field, ForeignKey):
                value = field.get_instance(value, instance)
            elif isinstance(field, ManyToManyField):
                value = data.getlist(f_name)
            else:
                value = field.clean(value, instance)
        except ValidationError as e:
            # TODO: make a better error system
            errors[field.name] = getattr(
                e, 'message',
                getattr(e, 'messages', ['Error'])[0]
            )
            continue

        # Leave defaults for fields that aren't in POST data, except for
        # checkbox inputs because they don't appear in POST data if not checked.
        # if (
        #     f.has_default()
        #     and form[f.name].field.widget.value_omitted_from_data(
        #         form.data, form.files, form.add_prefix(f.name)
        #     )
        #     and cleaned_data.get(f.name) in form[f.name].field.empty_values
        # ):
        #     continue

        # Defer saving file-type fields until after the other fields, so a
        # callable upload_to can use the values from other fields.
        if isinstance(field, models.FileField):
            file_field_list.append((field, value))
        else:
            field.save_form_data(instance, value)

    for file_field, value in file_field_list:
        file_field.save_form_data(instance, value)

    return instance, errors


# def update_field(field, instance, data, change):
#     f_name = 'F_' + field.name

#     if change and not f_name in data:
#         return

#     initial = field.get_default()
#     value = data.get(f_name, initial)

#     if isinstance(field, ForeignKey):
#         value = field.get_instance(value, instance)
#     else:
#         value = field.clean(value, instance)

#     field.save_form_data(instance, value)


'''

def display_for_field(value, field, empty_value_display):
    from django.contrib.admin.templatetags.admin_list import _boolean_icon

    if getattr(field, "flatchoices", None):
        return dict(field.flatchoices).get(value, empty_value_display)
    # BooleanField needs special-case null-handling, so it comes before the
    # general null test.
    elif isinstance(field, models.BooleanField):
        return _boolean_icon(value)
    elif value is None:
        return empty_value_display
    elif isinstance(field, models.DateTimeField):
        return formats.localize(timezone.template_localtime(value))
    elif isinstance(field, (models.DateField, models.TimeField)):
        return formats.localize(value)
    elif isinstance(field, models.DecimalField):
        return formats.number_format(value, field.decimal_places)
    elif isinstance(field, (models.IntegerField, models.FloatField)):
        return formats.number_format(value)
    elif isinstance(field, models.FileField) and value:
        return format_html('<a href="{}">{}</a>', value.url, value)
    elif isinstance(field, models.JSONField) and value:
        try:
            return json.dumps(value, ensure_ascii=False, cls=field.encoder)
        except TypeError:
            return display_for_value(value, empty_value_display)
    else:
        return display_for_value(value, empty_value_display)


def display_for_value(value, empty_value_display, boolean=False):
    from django.contrib.admin.templatetags.admin_list import _boolean_icon

    if boolean:
        return _boolean_icon(value)
    elif value is None:
        return empty_value_display
    elif isinstance(value, bool):
        return str(value)
    elif isinstance(value, datetime.datetime):
        return formats.localize(timezone.template_localtime(value))
    elif isinstance(value, (datetime.date, datetime.time)):
        return formats.localize(value)
    elif isinstance(value, (int, decimal.Decimal, float)):
        return formats.number_format(value)
    elif isinstance(value, (list, tuple)):
        return ", ".join(str(v) for v in value)
    else:
        return str(value)

'''

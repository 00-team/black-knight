import datetime
import decimal
import json

from black_knight.fields.related import ForeignKey
from django.db import models
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

        elif isinstance(field, models.ForeignKey):
            return 'foreign_key', value.pk, str(value)

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
        return formats.localize(value)

    if isinstance(value, (int, decimal.Decimal, float)):
        return value
        # return formats.number_format(value)

    if isinstance(value, (list, tuple)):
        return ', '.join(str(v) for v in value)

    # print(type(field))

    return str(value)


def update_field(name, instance, data, change):
    meta = instance._meta
    f_name = 'F_' + name

    if change and not f_name in data:
        return

    field = meta.get_field(name)
    initial = field.get_default()
    value = data.get(f_name, initial)

    if isinstance(field, ForeignKey):
        value = field.get_instance(value, instance)
    else:
        value = field.clean(value, instance)
    field.save_form_data(instance, value)


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

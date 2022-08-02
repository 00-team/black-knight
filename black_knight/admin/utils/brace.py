import datetime
import decimal

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

        if isinstance(field, models.ImageField):
            return 'image', value.url if value else None

        if isinstance(field, models.ForeignKey):
            return 'foreign_key', value.pk, str(value)

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

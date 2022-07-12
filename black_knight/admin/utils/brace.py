import datetime
import decimal

from django.db import models
from django.utils import formats, timezone


def value_dict(field, value) -> dict:

    if field:
        if getattr(field, 'flatchoices', None):
            return dict(field.flatchoices).get(value)

        if isinstance(field, models.ImageField):
            return 'image', value.url if value else None

    if value is None:
        return None

    if value == '':
        return None

    if isinstance(value, bool):
        return value

    if isinstance(value, datetime.datetime):
        return formats.localize(timezone.template_localtime(value))

    if isinstance(value, (datetime.date, datetime.time)):
        return formats.localize(value)

    if isinstance(value, (int, decimal.Decimal, float)):
        return value
        # return formats.number_format(value)

    if isinstance(value, (list, tuple)):
        return ', '.join(str(v) for v in value)

    # print(type(field))

    return str(value)

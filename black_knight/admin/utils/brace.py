import datetime
import decimal

from django.db import models
from django.utils import formats, timezone


def _get_value(item_type: str, item) -> dict:
    return item_type, item
    # return {
    #     't': item_type,
    #     'v': item
    # }


def value_dict(field, value) -> dict:

    if field:
        if getattr(field, 'flatchoices', None):
            return dict(field.flatchoices).get(value)

        if isinstance(field, models.ImageField):
            if value:
                return _get_value('image', value.url)
            else:
                return _get_value('image', None)

    # empty = _get_value('empty', empty)

    if value is None:
        return None

    if value == '':
        return None

    if isinstance(value, bool):
        return value

    if isinstance(value, datetime.datetime):
        return _get_value('datetime', int(value.timestamp()))
        # return int(value.timestamp())
        # return _get_value('datetime', [
        #     int(value.timestamp()),
        #     formats.localize(timezone.template_localtime(value))
        # ])

    if isinstance(value, (datetime.date, datetime.time)):
        return formats.localize(value)

    if isinstance(value, (int, decimal.Decimal, float)):
        return value
        # return formats.number_format(value)

    # if isinstance(value, (list, tuple)):
    #     return ', '.join(str(v) for v in value)

    # print(type(field))

    return str(value)

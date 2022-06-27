import datetime
import decimal

from django.db import models
from django.utils import formats, timezone


def value_dict(field, value, empty) -> dict:

    empty = {'null': empty}

    if value == None:
        return empty

    if value == '':
        return empty

    if isinstance(value, bool):
        return {'bool': value}

    if isinstance(value, datetime.datetime):
        return {'datetime': [
            value.timestamp(),
            formats.localize(timezone.template_localtime(value))
        ]}

    if isinstance(value, (datetime.date, datetime.time)):
        return {'char': formats.localize(value)}

    if isinstance(value, (int, decimal.Decimal, float)):
        return {'number': value}
        # return formats.number_format(value)

    # if isinstance(value, (list, tuple)):
    #     return ', '.join(str(v) for v in value)

    if field:
        if getattr(field, 'flatchoices', None):
            value = dict(field.flatchoices).get(value)
            if value:
                return {'char': value}
            else:
                return empty

        if isinstance(field, models.ImageField):
            return {'image': value.url}

    # print(type(field))

    return {'char': str(value)}

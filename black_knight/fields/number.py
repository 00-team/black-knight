from black_knight.fields import BaseField
from django.db.models import fields


class BooleanField(BaseField, fields.BooleanField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'boolean',
        })



class PositiveIntegerField(BaseField, fields.PositiveIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'int',
            'min': 0
        })


class PositiveBigIntegerField(BaseField, fields.PositiveBigIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'int',
            'min': 0
        })

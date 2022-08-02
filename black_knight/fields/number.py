from black_knight.fields import BaseField
from django.db.models import fields


class BooleanField(BaseField, fields.BooleanField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'boolean',
        })


class IntegerField(BaseField, fields.IntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': -2147483648,
            'max': 2147483647,
        })


class BigIntegerField(BaseField, fields.BigIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': -9223372036854775808,
            'max': 9223372036854775807,
        })


class SmallIntegerField(BaseField, fields.SmallIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': -32768,
            'max': 32767,
        })


class PositiveIntegerField(BaseField, fields.PositiveIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': 0,
            'max': 2147483647,

        })


class PositiveBigIntegerField(BaseField, fields.PositiveBigIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': 0,
            'max': 9223372036854775807,
        })


class PositiveSmallIntegerField(BaseField, fields.PositiveSmallIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': 0,
            'max': 32767,
        })

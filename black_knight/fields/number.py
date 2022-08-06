from black_knight.fields import BaseField
from django.core import validators
from django.db.models import fields
from django.utils.functional import cached_property


class BooleanField(BaseField, fields.BooleanField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'boolean',
        })


class IntegerField(BaseField, fields.IntegerField):

    MAX_INT = 2147483647
    MIN_INT = -MAX_INT - 1

    @cached_property
    def validators(self):
        _validators = super().validators
        _validators.append(validators.MaxValueValidator(self.MAX_INT))
        _validators.append(validators.MinValueValidator(self.MIN_INT))
        return _validators

    @property
    def info(self):
        return super().base_info(**{
            'type': 'integer',
            'min': self.MIN_INT,
            'max': self.MAX_INT,
        })


class BigIntegerField(IntegerField, fields.BigIntegerField):

    MAX_INT = 9223372036854775807
    MIN_INT = -MAX_INT - 1


class SmallIntegerField(IntegerField, fields.SmallIntegerField):

    MAX_INT = 32767
    MIN_INT = -MAX_INT - 1


class PositiveIntegerField(IntegerField, fields.PositiveIntegerField):

    MIN_INT = 0


class PositiveBigIntegerField(BigIntegerField, fields.PositiveBigIntegerField):

    MIN_INT = 0


class PositiveSmallIntegerField(SmallIntegerField, fields.PositiveSmallIntegerField):

    MIN_INT = 0


class DecimalField(BaseField, fields.DecimalField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'decimal',
            'max_digits': self.max_digits,
            'decimal_places': self.decimal_places,
        })


class FloatField(BaseField, fields.FloatField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'float'
        })

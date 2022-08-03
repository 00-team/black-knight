from black_knight.fields import BaseField
from django.db.models import fields


class DateField(BaseField, fields.DateField):

    def get_default(self):
        value = super().get_default()

        if value:
            value = value.date().isoformat()

        return value

    @property
    def info(self):
        return super().base_info(**{
            'type': 'date',
        })


class DateTimeField(BaseField, fields.DateTimeField):

    def get_default(self):
        value = super().get_default()

        if value:
            value = value.replace(microsecond=0)

        return value

    @property
    def info(self):
        return super().base_info(**{
            'type': 'datetime',
        })


class TimeField(BaseField, fields.TimeField):

    def get_default(self):
        value = super().get_default()

        if value:
            value = value.time().isoformat()

        return value

    @property
    def info(self):
        return super().base_info(**{
            'type': 'time',
        })

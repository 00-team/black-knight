from black_knight.fields import BaseField
from django.db.models import fields


class DateField(BaseField, fields.DateField):

    def get_default(self):
        value = super().get_default()
        return value.date().isoformat()

    @property
    def info(self):
        return super().base_info(**{
            'type': 'date',
        })


class DateTimeField(BaseField, fields.DateTimeField):

    def get_default(self):
        value = super().get_default()
        return value.replace(microsecond=0)

    @property
    def info(self):
        return super().base_info(**{
            'type': 'datetime',
        })

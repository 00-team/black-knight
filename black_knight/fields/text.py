from black_knight.fields import BaseField
from django.db.models import fields


class CharField(BaseField, fields.CharField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'max_length': self.max_length
        })


class TextField(BaseField, fields.TextField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'text',
        })


class DurationField(BaseField, fields.DurationField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'duration',
        })

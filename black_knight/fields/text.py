from black_knight.fields import BaseField
from django.db.models import fields
from django.db.models.fields import json


class TextField(BaseField, fields.TextField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'text',
        })


class JSONField(BaseField, json.JSONField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'json',
        })


class MarkDownField(TextField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'markdown',
        })

from black_knight.fields import BaseField
from django.db.models import fields
from django.db.models.fields import json


class CharField(BaseField, fields.CharField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'max_length': self.max_length
        })


class SlugField(BaseField, fields.SlugField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'slug',
            'allow_unicode': self.allow_unicode,
            'max_length': self.max_length,
        })


class URLField(BaseField, fields.URLField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'url',
            'max_length': self.max_length,
        })


class EmailField(BaseField, fields.EmailField):

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


class GenericIPAddressField(BaseField, fields.GenericIPAddressField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'ip_address',
            'protocol': self.protocol
        })


class JSONField(BaseField, json.JSONField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'json',
        })
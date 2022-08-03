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
            'type': 'char',
            'validation': 'slug',
            'allow_unicode': self.allow_unicode,
            'max_length': self.max_length,
        })


class URLField(BaseField, fields.URLField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'validation': 'url',
            'max_length': self.max_length,
        })


class EmailField(BaseField, fields.EmailField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'validation': 'email',
            'max_length': self.max_length
        })


class UUIDField(BaseField, fields.UUIDField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'validation': 'uuid'
        })


class DurationField(BaseField, fields.DurationField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'validation': 'duration',
        })


class GenericIPAddressField(BaseField, fields.GenericIPAddressField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'char',
            'validation': 'ip_address',
            'protocol': self.protocol
        })


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

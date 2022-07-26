from django.db.models import fields
from django.db.models.fields import files


class CharField(fields.CharField):

    @property
    def info(self):
        return {
            'type': 'char',
            'max': self.max_length
        }


class TextField(fields.TextField):

    @property
    def info(self):
        return {
            'type': 'text',
        }


class DateField(fields.DateField):

    @property
    def info(self):
        return {
            'type': 'date',
        }


class PositiveBigIntegerField(fields.PositiveBigIntegerField):

    @property
    def info(self):
        return {
            'type': 'int',
            'min': 0
        }


class ImageField(files.ImageField):

    @property
    def info(self):
        return {
            'type': 'image'
        }

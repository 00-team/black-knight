from django.db.models import fields
from django.db.models.fields import files, related


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


class BooleanField(fields.BooleanField):

    @property
    def info(self):
        return {
            'type': 'boolean',
        }


class DateField(fields.DateField):

    def get_default(self):
        value = super().get_default()
        return value.date().isoformat()

    @property
    def info(self):
        return {
            'type': 'date',
        }


class DateTimeField(fields.DateTimeField):

    @property
    def info(self):
        return {
            'type': 'datetime',
        }


class PositiveIntegerField(fields.PositiveIntegerField):

    @property
    def info(self):
        return {
            'type': 'int',
            'min': 0
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


class ForeignKey(related.ForeignKey):

    @property
    def info(self):
        return {
            'type': 'choice',
            'choices': self.get_choices(blank_choice=[])
        }

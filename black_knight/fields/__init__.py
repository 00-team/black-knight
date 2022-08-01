from django.db.models import fields
from django.db.models.fields import files, related


class BaseField:

    def base_info(self, **kwargs):
        infos = {
            'required': not self.blank,
            'help_text': self.help_text,
            'initial': self.get_default(),
            'label': self.verbose_name,
            'name': self.name,
        }

        if self.choices is not None:
            infos['choices'] = self.get_choices(include_blank=False)

        infos.update(kwargs)

        return infos


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


class BooleanField(BaseField, fields.BooleanField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'boolean',
        })


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


class PositiveIntegerField(BaseField, fields.PositiveIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'int',
            'min': 0
        })


class PositiveBigIntegerField(BaseField, fields.PositiveBigIntegerField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'int',
            'min': 0
        })


class ImageField(BaseField, files.ImageField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'image'
        })


class ForeignKey(BaseField, related.ForeignKey):

    def clean(self, value, model_instance):
        value = super().clean(value, model_instance)

        manager = self.remote_field.model._default_manager
        qs = manager.complex_filter(self.get_limit_choices_to())

        if isinstance(value, qs.model):
            return value

        value = qs.get(**{self.remote_field.field_name: value})

        return value

    @property
    def info(self):
        return super().base_info(**{
            'type': 'foreign_key',
            'choices': self.get_choices(include_blank=False)
        })

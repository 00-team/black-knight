from black_knight.fields import BaseField
from django.db.models.fields import related


class ForeignKey(BaseField, related.ForeignKey):

    def get_instance(self, value, model_instance):
        value = self.clean(value, model_instance)

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
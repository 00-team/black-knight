from black_knight.fields import BaseField
from django.db.models.fields import files


class ImageField(BaseField, files.ImageField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'image'
        })

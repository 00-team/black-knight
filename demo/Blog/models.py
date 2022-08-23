import time

from black_knight import fields
from django.db import models
from django.utils.timezone import now


class Blog(models.Model):
    title = fields.CharField(max_length=50)
    content = fields.MarkDownField(default='# title')
    description = fields.TextField()
    thumbnail = fields.ImageField(upload_to='Blog/thumbnail/')
    publish_date = fields.DateField(default=now)
    study_time = fields.PositiveBigIntegerField(default=0)

    @property
    def _study_time(self):
        return time.strftime('%H:%M:%S', time.gmtime(self.study_time))

    _study_time.fget.admin_order_field = 'study_time'

    def __str__(self) -> str:
        return self.title

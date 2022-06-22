from django.db import models
from django.utils.timezone import now


class Blog(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='Blog/thumbnail/')
    publish_date = models.DateField(default=now)
    study_time = models.PositiveBigIntegerField(default=0)

    def __str__(self) -> str:
        return self.title

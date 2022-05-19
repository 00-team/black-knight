from django.db import models


class Blog(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='Blog/thumbnail/')

    def __str__(self) -> str:
        return self.title

from django.db import models
from django.utils.timezone import now


TARGETED_GROUPS = (
    ('CH', 'Children'),
    ('AD', 'Adults'),
)


class Author(models.Model):
    name = models.CharField(max_length=100, unique=True)
    age = models.PositiveIntegerField(default=3)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=20)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    targeted_group = models.CharField(
        max_length=2,
        choices=TARGETED_GROUPS,
        default='AD'
    )
    is_nsfw = models.BooleanField(default=False)
    publish_date = models.DateTimeField(default=now)
    cover = models.ImageField(upload_to='Book/cover/', blank=True, null=True)
    pages = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

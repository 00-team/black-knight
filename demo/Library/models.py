from black_knight import fields
from django.db import models
from django.utils.timezone import now


TARGETED_GROUPS = (
    ('CH', 'Children'),
    ('AD', 'Adults'),
)


class Author(models.Model):
    name = fields.CharField(max_length=100, unique=True)
    age = fields.PositiveIntegerField(default=3)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = fields.CharField(max_length=20)
    author = fields.ForeignKey(Author, on_delete=models.CASCADE)
    targeted_group = fields.CharField(
        max_length=2,
        choices=TARGETED_GROUPS,
        default='AD'
    )
    is_nsfw = fields.BooleanField(default=False)
    publish_date = fields.DateTimeField(default=now)
    cover = fields.ImageField(upload_to='Book/cover/', blank=True, null=True)
    pages = fields.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

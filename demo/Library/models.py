from black_knight import fields
from django.conf import settings
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


class AllFields(models.Model):
    integer = fields.IntegerField()
    big_int = fields.BigIntegerField()
    small_integer = fields.SmallIntegerField()

    positive_integer = fields.PositiveIntegerField()
    positive_big_integer = fields.PositiveBigIntegerField()
    positive_small_integer = fields.PositiveSmallIntegerField()

    decimal = models.DecimalField(max_digits=5, decimal_places=2)
    xfloat = models.FloatField()
    duration = models.DurationField()

    boolean = fields.BooleanField()

    char = models.CharField(max_length=101)
    email = models.EmailField()
    generic_ip_address = models.GenericIPAddressField()
    json = models.JSONField()
    slug = models.SlugField()
    text = models.TextField()
    url = models.URLField()
    uuid = models.UUIDField()

    date = models.DateField()
    datetime = models.DateTimeField()
    time = models.TimeField()

    xfile = models.FileField(upload_to='ALL/xfile/')
    file_path = models.FilePathField(path=settings.BASE_DIR)
    image = models.ImageField(upload_to='ALL/image/')

    many_2_many = models.ManyToManyField(Book)
    one_2_one = models.OneToOneField(
        Author, null=True,
        on_delete=models.SET_NULL,
    )

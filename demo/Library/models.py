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
    big_int = models.BigIntegerField()
    binary = models.BinaryField()
    boolean = models.BooleanField()
    char = models.CharField(max_length=101)
    date = models.DateField()
    datetime = models.DateTimeField()
    decimal = models.DecimalField(max_digits=5, decimal_places=2)
    duration = models.DurationField()
    email = models.EmailField()
    xfile = models.FileField(upload_to='ALL/xfile/')
    file_path = models.FilePathField(path=settings.BASE_DIR)
    xfloat = models.FloatField()
    generic_ip_address = models.GenericIPAddressField()
    image = models.ImageField(upload_to='ALL/image/')
    integer = models.IntegerField()
    json = models.JSONField()
    positive_big_integer = models.PositiveBigIntegerField()
    positive_integer = models.PositiveIntegerField()
    positive_small_integer = models.PositiveSmallIntegerField()
    slug = models.SlugField()
    small_integer = models.SmallIntegerField()
    text = models.TextField()
    time = models.TimeField()
    url = models.URLField()
    uuid = models.UUIDField()
    many_2_many = models.ManyToManyField(Book)
    one_2_one = models.OneToOneField(
        Author, null=True,
        on_delete=models.SET_NULL,
    )

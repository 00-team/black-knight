from datetime import datetime
from random import choice, randrange
from time import time

from Blog.models import Blog
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils.timezone import utc
from Library.models import AllFields, Author, Book


def get_random_date(start=1460995789):
    now = int(time())
    date = datetime.fromtimestamp(
        randrange(start, now),
        tz=utc if settings.USE_TZ else None
    )
    return date


def create_books(ammout=1000):
    authors = Author.objects.all()
    for i in range(ammout):
        idx = str(i)
        Book(
            title=f'{idx}-{get_random_string(18)[:19-len(idx)]}',
            author=choice(authors),
            targeted_group=choice(['CH', 'AD']),
            is_nsfw=choice([True, False]),
            publish_date=get_random_date(),
            pages=randrange(0, 280)
        ).save()

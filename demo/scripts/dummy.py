from datetime import datetime
from random import choice, randrange
from time import time

from Account.models import AccountTemp
from Blog.models import Blog
from django.conf import settings
from django.utils.crypto import get_random_string
from django.utils.timezone import utc
from Library.models import Author, Book


authors_names = [
    'Chinua Achebe', 'Peter Ackroyd', 'Douglas Adams', 'Monica Ali',
    'Chimamanda Ngozi Adichie', 'Aaron Akinyemi', 'Alexandra Harris',
    'Dante Alighieri', 'Alistair Cooke', 'Benjamin Markovits',
    'George Bernard Shaw', 'Louis de Bernières', 'John Betjeman',
    'Maeve Binchy', 'Carol Birch', 'Quentin Blake', 'William Blake',
    'Enid Blyton', 'Roberto Bolaño', 'Katherine Boo', 'Jorge Luis Borges',
    'Esi Edugyan', 'Dave Eggers', 'George Eliot', 'James Ellroy',
    'Anne EnrightWilliam Boyd', 'Nadine Gordimer', 'Gore Vidal',
    'Günter Grass', 'Alasdair Gray', 'Simon Gray', 'John Green',
    'Graham Greene', 'Germaine Greer', 'Philippa Gregory', 'John Grisham',
]


def random_text(chunks=8, length=8):
    text = get_random_string(length) + ' '
    return text * chunks


def get_random_date(start=1460995789):
    now = int(time())
    date = datetime.fromtimestamp(
        randrange(start, now),
        tz=utc if settings.USE_TZ else None
    )
    return date


def create_authors():
    for name in authors_names:
        Author(name=name, age=randrange(7, 79)).save()


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


def create_blogs(ammout=1000):
    for i in range(ammout):
        idx = str(i)
        Blog(
            title=f'{idx}. {get_random_string(47)[:49-len(idx)]}',
            description=random_text(randrange(4, 13), randrange(5, 18)),
            thumbnail='GGEZ',
            publish_date=get_random_date(),
            study_time=randrange(136, 501)
        ).save()


def create_account_temps(ammout=7507):
    for _ in range(ammout):
        AccountTemp(name=get_random_string(50)).save()

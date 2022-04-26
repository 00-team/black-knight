# black knight

Django custom admin site

## install

`pip install black-knight`

## usage

```py
# settings.py

from black_knight import apps

INSTALLED_APPS = apps + [
    # delete 'django.contrib.admin'
    ...
]

```

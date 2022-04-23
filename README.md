# black-night

Django custom admin site

## install

`pip install black-night`

## usage

```py
# settings.py

from black_night import apps

INSTALLED_APPS = apps + [
    # delete 'django.contrib.admin'
    ...
]

```

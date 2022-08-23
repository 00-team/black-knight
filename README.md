# black knight

Django custom admin site

## Note

there are some major issue that are not easily fixable.\
if you want to use this library the best practice is to have both **djagno's default admin** and **black knight's admin** running side by side.

you can find the demo project in [demo](demo) directory

<!-- have this in mind that this library is a very hacky way of making an admin page with react for django,
because django designed in a way that every module and component of it is connected together,
so we canot change some of the basic compnent of it
so an small change in admin is not a enough to make it work
so in order to make a admin site we need to change database model fields and so on.
because django is a framework and everything in it is connected makeing a seprate admin site is not an easy task.\
and up on this note we do not support everything in black knight.\
the best practice is to have both admin pages side by side. -->

## install

`pip install black-knight`

## usage

create a new file in your main project directory\
`myproject/admin.py`

```py
# admin.py

from black_knight.admin import AdminSite

class KnightAdmin(AdminSite):
    pass

knight = KnightAdmin()
```

add black_knight in your installed apps\
`myproject/settings.py`

```py
# settings.py

INSTALLED_APPS = [
    ...
    'black_knight',
    ...
]

```

add new admin url in your urls.py\
`myproject/urls.py`

```py
# import your AdminSite instance
from myproject.admin import knight

urlpatterns = [
    ...
    path('admin/', knight.urls),
    path('old-admin/', admin.site.urls),
    ...
]

```

register your admins with the new `knight` as well.\
`myapp/admin.py`

```py
from black_knight.admin import ModelAdmin
from myproject.admin import knight
from django.contrib import admin

from .models import MyModel

class MyModelAdmin(ModelAdmin):
    pass


admin.site.register(MyModel, MyModelAdmin)

knight.register(MyModel, MyModelAdmin)

```

you also need to change your `models.py`\
`myapp/models.py`

```diff
# replace all the models.XXXField with fields.XXXField

from black_knight import fields
from django.db import models


class MyModel(models.Model):
+    title = fields.CharField(max_length=50)
-    title = models.CharField(max_length=50)

```

import datetime
import decimal
import json
from itertools import chain

from black_knight import fields
from black_knight.fields import ForeignKey, ManyToManyField
from django.core.exceptions import ValidationError
from django.db.models import AutoField
from django.db.models import Field as ModelField
from django.db.models import FileField
from django.urls import NoReverseMatch, reverse


class Value:
    def __init__(self, value_type='char', value=None):
        self.value_type = value_type
        self.value = value

    def get_value(self):
        if (isinstance(self.value, (list, tuple))):
            return self.value
        else:
            return [self.value]

    @property
    def with_type(self):
        return self.value_type, *self.get_value()


def get_remote_url(field, value):
    meta = field.remote_field.model._meta
    app_label = meta.app_label
    model_name = meta.model_name

    try:
        url = reverse('black_knight:index', current_app='black_knight')
        url += f'{app_label}/{model_name}/change/{value.pk}/'
        return 'link', url
    except NoReverseMatch:
        str(value)


def field_value(field, value) -> Value:
    if value is None:
        return Value('null', None)

    if not field:
        return render_value(value)

    if isinstance(field, (fields.ImageField, fields.FileField)):
        vtype = 'image' if (isinstance(field, fields.ImageField)) else 'file'

        if not value:
            return Value(vtype, None)

        if getattr(field, 'flatchoices', None):
            return Value(vtype, value.name)

        return Value(vtype, value.url)

    elif isinstance(field, fields.ForeignKey):
        return Value('foreign_key', (value.pk, str(value)))

    elif isinstance(field, fields.ManyToManyField):
        items = map(lambda obj: (obj.pk, str(obj)), value.get_queryset())
        return Value('many_to_many', [list(items)])

    elif isinstance(field, fields.JSONField):
        try:
            return Value('json', json.dumps(
                value, ensure_ascii=False, cls=field.encoder
            ))
        except TypeError:
            return render_value(value)

    elif getattr(field, 'flatchoices', None):
        return Value('choice', value)

    return render_value(value)


def render_value(value):
    if value is None or value == '':
        return Value('null', None)

    elif isinstance(value, bool):
        return Value('bool', value)

    elif isinstance(value, datetime.datetime):
        return Value('datetime', value.replace(microsecond=0).isoformat())

    elif isinstance(value, datetime.date):
        return Value('date', value.isoformat())

    elif isinstance(value, datetime.time):
        return Value('time', value.isoformat())

    elif isinstance(value, datetime.timedelta):
        return Value('timedelta', str(value))
        # return value.total_seconds()

    elif isinstance(value, int):
        return Value('integer', value)

    elif isinstance(value, decimal.Decimal):
        return Value('decimal', value)

    elif isinstance(value, float):
        return Value('float', value)

    elif hasattr(value, '__html__'):
        return Value('html', str(value))

    # if isinstance(value, (list, tuple)):
    #     return ', '.join(str(v) for v in value)

    return Value('char', str(value))


def construct_instance(instance, data, change, include=None, exclude=None):

    opts = instance._meta
    file_field_list = []
    errors = {}

    private_fields = [
        f for f in opts.private_fields if isinstance(f, ModelField)
    ]
    fields = chain(opts.concrete_fields, private_fields, opts.many_to_many)

    for field in fields:
        f_name = 'F_' + field.name
        if (
            not field.editable
            or isinstance(field, AutoField)
            # or f_name not in data
        ):
            continue
        if include is not None and field.name not in include:
            continue
        if exclude and field.name in exclude:
            continue
        if change and not f_name in data:
            continue

        initial = field.get_default()
        value = data.get(f_name, initial)

        try:
            if isinstance(field, ForeignKey):
                value = field.get_instance(value, instance)
            elif isinstance(field, ManyToManyField):
                value = data.getlist(f_name)
            else:
                value = field.clean(value, instance)
        except ValidationError as e:
            # TODO: make a better error system
            errors[field.name] = getattr(
                e, 'message',
                getattr(e, 'messages', ['Error'])[0]
            )
            continue

        # Leave defaults for fields that aren't in POST data, except for
        # checkbox inputs because they don't appear in POST data if not checked.
        # if (
        #     f.has_default()
        #     and form[f.name].field.widget.value_omitted_from_data(
        #         form.data, form.files, form.add_prefix(f.name)
        #     )
        #     and cleaned_data.get(f.name) in form[f.name].field.empty_values
        # ):
        #     continue

        # Defer saving file-type fields until after the other fields, so a
        # callable upload_to can use the values from other fields.
        if isinstance(field, FileField):
            file_field_list.append((field, value))
        else:
            field.save_form_data(instance, value)

    for file_field, value in file_field_list:
        file_field.save_form_data(instance, value)

    return instance, errors

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
    def __init__(self, value_type, value, *args, **kwargs):
        self.value_type = value_type
        self.value = value

        if len(args) > 0:
            self._display = args[0]
        else:
            self._display = kwargs.get('display', value)

    def get_display(self):
        if (isinstance(self._display, (list, tuple))):
            return self._display
        else:
            return [self._display]

    @property
    def display(self):
        return self.value_type, *self.get_display()


def m2m_url(field):
    meta = field.remote_field.model._meta
    app_label = meta.app_label
    model_name = meta.model_name

    base_url = reverse('black_knight:index', current_app='black_knight')
    base_url += f'{app_label}/{model_name}/change/'

    def inner(value):
        return base_url + f'{value.pk}/'

    return inner


def get_remote_url(field, value):
    meta = field.remote_field.model._meta
    app_label = meta.app_label
    model_name = meta.model_name

    try:
        url = reverse('black_knight:index', current_app='black_knight')
        url += f'{app_label}/{model_name}/change/{value.pk}/'
        return url
    except NoReverseMatch:
        return str(value)


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
            return Value(vtype, value.name, value.url)

        return Value(vtype, value.url)

    elif isinstance(field, fields.ForeignKey):
        return Value(
            'foreign_key', value.pk,
            (str(value), get_remote_url(field, value))
            # pk, label, url
        )

    elif isinstance(field, fields.ManyToManyField):
        remote_url = m2m_url(field)
        items = value.get_queryset()

        values = map(lambda obj: obj.pk, items)
        displays = map(lambda obj: (str(obj), remote_url(obj)), items)

        return Value('many_to_many', list(values), [list(displays)])

    elif isinstance(field, fields.JSONField):
        try:
            return Value('json', json.dumps(
                value, ensure_ascii=False, cls=field.encoder
            ))
        except TypeError:
            return render_value(value)

    elif getattr(field, 'flatchoices', None):
        value = str(value)
        display = dict(field.flatchoices).get(value)
        return Value('char', value, display)

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

    def check_field(field) -> bool:
        f_name = 'F_' + field.name
        if (
            not field.editable
            or isinstance(field, AutoField)
            # or f_name not in data
        ):
            return False
        if include is not None and field.name not in include:
            return False
        if exclude and field.name in exclude:
            return False
        if change and not f_name in data:
            return False

        return True

    for field in opts.concrete_fields:
        if not check_field(field):
            continue

        f_name = 'F_' + field.name

        initial = field.get_default()
        value = data.get(f_name, initial)

        try:
            if isinstance(field, ForeignKey):
                value = field.get_instance(value, instance)
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

    def save_m2m():
        m2m_errors = {}
        private_fields = [
            f for f in opts.private_fields if isinstance(f, ModelField)
        ]
        for field in chain(private_fields, opts.many_to_many):
            if not check_field(field):
                continue

            f_name = 'F_' + field.name

            initial = field.get_default()
            value = data.get(f_name, initial)

            try:
                if isinstance(field, ManyToManyField):
                    value = data.getlist(f_name)
                else:
                    value = field.clean(value, instance)
            except ValidationError as e:
                # TODO: make a better error system
                m2m_errors[field.name] = getattr(
                    e, 'message',
                    getattr(e, 'messages', ['Error'])[0]
                )
                continue

            field.save_form_data(instance, value)

        return m2m_errors

    return instance, errors, save_m2m

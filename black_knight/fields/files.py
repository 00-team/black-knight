import operator
import os
import re

from black_knight.fields import BaseField
from django.db.models import fields
from django.db.models.fields import files


class ImageField(BaseField, files.ImageField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'image'
        })


class FileField(BaseField, files.FileField):

    @property
    def info(self):
        return super().base_info(**{
            'type': 'file'
        })


class FilePathField(BaseField, fields.FilePathField):

    def __init__(self, match=None, *args, **kwargs):
        self.match_re = None

        if match is not None:
            self.match_re = re.compile(self.match)

        super().__init__(match=match, *args, **kwargs)

    def get_file_choices(self):
        choices = []
        path = self.path() if callable(self.path) else self.path
        check_match = self.match_re is None

        if self.recursive:
            for root, dirs, files in sorted(os.walk(path)):

                if self.allow_files:
                    for f in sorted(files):
                        if check_match or self.match_re.search(f):
                            f = os.path.join(root, f)
                            choices.append((f, f.replace(path, '', 1)))

                if self.allow_folders:
                    for f in sorted(dirs):
                        if f == '__pycache__':
                            continue
                        if check_match or self.match_re.search(f):
                            f = os.path.join(root, f)
                            choices.append((f, f.replace(path, '', 1)))

        else:
            with os.scandir(path) as entries:
                for f in entries:
                    if f.name == '__pycache__':
                        continue
                    if ((
                        (self.allow_files and f.is_file()) or
                        (self.allow_folders and f.is_dir())
                    ) and (check_match or self.match_re.search(f.name))):
                        choices.append((f.path, f.name))

            choices.sort(key=operator.itemgetter(1))

        return choices

    @property
    def info(self):
        return super().base_info(**{
            'type': 'file_path',
            'choices': self.get_file_choices()
        })

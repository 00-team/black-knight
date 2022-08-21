from black_knight import fields
from django.contrib.auth.models import User
from django.db import models


class Account(models.Model):
    user = fields.OneToOneField(User, on_delete=models.CASCADE)
    nickname = fields.CharField(max_length=30)
    photo = fields.ImageField(upload_to='Account/photo/')

    def __str__(self) -> str:
        return f'str: {self.nickname}'


class AccountTemp(models.Model):
    name = fields.CharField(max_length=57)

    def __str__(self):
        return self.name

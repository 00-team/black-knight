from django.contrib.auth.models import User
from django.db import models


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=30)
    photo = models.ImageField(upload_to='Account/photo/')

    def __str__(self) -> str:
        return f'str: {self.nickname}'


class AccountTemp(models.Model):
    name = models.CharField(max_length=57)

    def __str__(self):
        return self.name

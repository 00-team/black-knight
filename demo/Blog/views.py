from django.http import HttpRequest
from django.middleware.csrf import get_token
from django.shortcuts import render

from .models import Blog


def blogs(request: HttpRequest):
    get_token(request)
    context = {'blogs': Blog.objects.all()}
    return render(request, 'blogs.html', context)

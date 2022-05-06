from json import loads
from typing import Any

from django.http import HttpRequest


def BodyLoader(body: bytes) -> dict[str, Any]:
    try:
        data = loads(body)

        if isinstance(data, dict):
            return data

    except Exception:
        pass

    return {}


def get_data(request: HttpRequest) -> dict[str, Any]:
    data: dict[str, Any] = {}

    if request.method == 'GET':
        if request.GET:
            data = request.GET
        elif request.content_type != 'multipart/form-data':
            data = BodyLoader(request.body)

    elif request.method == 'POST':
        if request.POST:
            data = request.POST
        elif request.content_type != 'multipart/form-data':
            data = BodyLoader(request.body)

    return data

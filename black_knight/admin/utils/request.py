from json import loads

from django.http import HttpRequest


def BodyLoader(body: bytes) -> dict:
    try:
        return loads(body)
    except Exception:
        return {}


def get_data(request: HttpRequest) -> dict:
    data = {}

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

    if not isinstance(data, dict):
        data = {}

    return data

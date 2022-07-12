from json import JSONDecodeError, loads

from django.http import HttpRequest, QueryDict


def json_loader(body: bytes) -> dict:
    try:
        data = loads(body)
        if isinstance(data, dict):
            return data
    except JSONDecodeError:
        pass

    return {}


def get_data(request: HttpRequest) -> QueryDict:
    data: QueryDict = getattr(request, request.method, QueryDict()).copy()

    if request.content_type == 'application/json':
        data.update(json_loader(request.body))

    return data

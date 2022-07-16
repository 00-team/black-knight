from django.http import JsonResponse


def ErrorResponse(message: str, code: int) -> JsonResponse:
    context = {'message': str(message), 'code': code}
    return JsonResponse(context, status=code)


# default error massage
DEM = 'Error while processing the Request'


class E(Exception):
    message: str
    code: int

    def __init__(self, message: str = DEM, code: int = 400):
        self.message = str(message)
        self.code = int(code)

    def __str__(self):
        return self.message

    def __index__(self):
        return self.code

    @property
    def response(self):
        context = {'message': self.message, 'code': self.code}
        return JsonResponse(context, status=self.code)


INVALID_INPUT = ErrorResponse('Invalid Input', 400)

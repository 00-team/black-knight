from django.http import JsonResponse


class ErrorResponse(JsonResponse):
    def __init__(self, message='Error', status=400, extra={}, **kwargs):
        data = {
            'error': {
                'message': message,
                'code': status,
                **extra
            }
        }
        super().__init__(data=data, **kwargs)

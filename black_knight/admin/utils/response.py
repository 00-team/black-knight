from django.http import JsonResponse


class ErrorResponse(JsonResponse):
    def __init__(self, message='Error', status=400, data={}, error={}, **kwargs):
        content = {
            'error': {
                'message': message,
                'code': status,
                **error,
            },
            **data,
        }
        super().__init__(data=content, status=status, **kwargs)

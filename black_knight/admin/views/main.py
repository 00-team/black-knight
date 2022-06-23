from django.http import HttpRequest, JsonResponse


class BraceList:
    list_display = ('__str__',)
    list_filter = ()
    list_per_page = 100
    list_editable = ()
    search_fields = ()
    search_help_text = None
    date_hierarchy = None
    preserve_filters = True
    actions = []

    request: HttpRequest

    def __init__(self, request, model_admin) -> None:
        self.model = model_admin.model
        self.request = request
        self.list_display = model_admin.get_list_display(request)
        self.list_filter = model_admin.get_list_filter(request)
        self.list_per_page = model_admin.list_per_page
        self.list_editable = model_admin.list_editable
        self.search_fields = model_admin.get_search_fields(request)
        self.search_help_text = model_admin.search_help_text
        self.date_hierarchy = model_admin.date_hierarchy
        self.preserve_filters = model_admin.preserve_filters
        self.actions = model_admin.get_action_choices(request, [])

    def get_response(self):

        return JsonResponse({})

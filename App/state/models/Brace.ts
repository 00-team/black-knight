interface BraceListModel {
    preserve_filters: boolean
    search_help_text: null | string
    full_result_count: null | number
    actions: ActionModel[] | null
    results: ResultModel[]
    headers: string[]
}

interface ActionModel {
    name: string
    description: string
}

type ResultModel = [number, ...string[]]

export { BraceListModel, ActionModel, ResultModel }

const DefaultBraceList: BraceListModel = {
    preserve_filters: true,
    search_help_text: null,
    full_result_count: 0,
    actions: null,
    results: [],
    headers: [],
}

export { DefaultBraceList }

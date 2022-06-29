interface BraceListModel {
    preserve_filters: boolean
    search_help_text: null | string
    full_result_count: null | number
    empty_value_display: string
    actions: ActionModel[] | null
    results: ResultModel[]
    headers: string[]
}

interface ActionModel {
    name: string
    description: string
}

type PK = string | number
type ResultModel = [PK, ...ResultRow[]]

type RImage = ['image', string | null]

type ResultRow = string | number | boolean | null | RImage

export { BraceListModel, ActionModel, ResultModel, PK, ResultRow }

const DefaultBraceList: BraceListModel = {
    preserve_filters: true,
    search_help_text: null,
    full_result_count: 0,
    empty_value_display: '-empty-',
    actions: null,
    results: [],
    headers: [],
}

export { DefaultBraceList }

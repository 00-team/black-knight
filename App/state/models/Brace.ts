interface BraceInfoModel {
    preserve_filters: boolean
    show_search: boolean
    search_help_text: null | string
    full_result_count: null | number
    empty_value_display: string
    actions: ActionModel[] | null
    headers: string[]
}

interface BraceListModel {
    results: ResultModel[]
}

interface ActionModel {
    name: string
    description: string
}

type PK = string | number
type ResultModel = [PK, ...ResultRow[]]

type RImage = ['image', string | null]

type ResultRow = string | number | boolean | null | RImage

type TLoading = ['loading', string]
type TPKMap = { [k: number]: PK }

export { BraceListModel, ActionModel, BraceInfoModel }
export { ResultModel, PK, ResultRow }
export { TLoading, TPKMap }

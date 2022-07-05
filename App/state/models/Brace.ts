interface BraceInfoModel {
    preserve_filters: boolean
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

export { BraceListModel, ActionModel, BraceInfoModel }
export { ResultModel, PK, ResultRow }

const DefaultBraceInfo: BraceInfoModel = {
    preserve_filters: true,
    search_help_text: null,
    full_result_count: 0,
    empty_value_display: '-empty-',
    actions: null,
    headers: [],
}

const DefaultBraceList: BraceListModel = {
    results: [],
}

export { DefaultBraceList, DefaultBraceInfo }

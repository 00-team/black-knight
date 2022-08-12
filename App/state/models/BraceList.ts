import { D_ALL, PK } from 'state'

// using BL_ prefix for Brace List Stuff

interface BL_InfoModel {
    preserve_filters: boolean
    show_search: boolean
    search_help_text: null | string
    full_result_count: null | number
    empty_value_display: string
    actions: ActionModel[] | null
    headers: string[]
    orders: string[]
}

interface BL_ResultModel {
    results: ResultModel[]
    ordered_by: string[]
    page: PageModel | null
    result_count: number
}

interface PageModel {
    current: number
    max: number
}

interface ActionModel {
    name: string
    description: string
}

type ResultModel = [PK, ...D_ALL[]]

type PK_MAP = { [k: number]: PK }

export { BL_InfoModel, BL_ResultModel }
export { PageModel, ActionModel }
export { ResultModel, PK_MAP }

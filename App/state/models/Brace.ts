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

type PK = string | number
type ResultModel = [PK, ...ResultRow[]]

enum ResultType {
    datetime = 'datetime',
    number = 'number',
    empty = 'empty',
    bool = 'bool',
    char = 'char',
    image = 'image',
}

type RDateTime = { [ResultType.datetime]: [number, string] }
type RNumber = { [ResultType.number]: number }
type REmpty = { [ResultType.empty]: string }
type RBool = { [ResultType.bool]: boolean }
type RChar = { [ResultType.char]: string }
type RImage = { [ResultType.image]: string }

type ResultRow = RDateTime | REmpty | RNumber | RBool | RChar | RImage

export { BraceListModel, ActionModel, ResultModel, PK, ResultType, ResultRow }

const DefaultBraceList: BraceListModel = {
    preserve_filters: true,
    search_help_text: null,
    full_result_count: 0,
    actions: null,
    results: [],
    headers: [],
}

export { DefaultBraceList }

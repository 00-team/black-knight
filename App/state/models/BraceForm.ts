import { Field, PK } from 'state'

interface Fieldset {
    name: string | null
    description: string | null
    fields: Field[]
}

interface BraceFormModel {
    fieldsets: Fieldset[]
    label: string | null
}

interface BaseOptions {
    data: FormData
    app_label: string
    model_name: string
}

interface AddOptions extends BaseOptions {
    type: 'add'
}

interface ChangeOptions extends BaseOptions {
    type: 'change'
    pk: PK
}

type TBFSOptions = AddOptions | ChangeOptions

export { BraceFormModel, TBFSOptions }

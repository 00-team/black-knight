import { FieldModel, PermsModel, PK } from 'state'

interface FieldsetModel {
    name: string | null
    description: string | null
    fields: FieldModel[]
}

interface BraceFormModel {
    fieldsets: FieldsetModel[]
    label: string | null
    perms: PermsModel
}

interface BraceFormErrorsModel {
    fields?: { [k: string]: string }
    error: { message: string; code: number }
}

interface SubmitOptions {
    data?: FormData
    app_label?: string
    model_name?: string
    pk?: PK
    type?: 'add' | 'change' | 'delete'
}

export { FieldsetModel, BraceFormModel, SubmitOptions, BraceFormErrorsModel }

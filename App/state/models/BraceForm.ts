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

interface SubmitOptions {
    data?: FormData
    app_label?: string
    model_name?: string
    pk?: PK
    type?: 'add' | 'change'
}

export { BraceFormModel, SubmitOptions }

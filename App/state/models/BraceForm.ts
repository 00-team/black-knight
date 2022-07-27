import { Field } from 'state'

interface Fieldset {
    name: string | null
    description: string | null
    fields: Field[]
}

interface BraceFormModel {
    fieldsets: Fieldset[]
    instance_str: string | null
}

export { BraceFormModel }

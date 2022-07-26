import { Field } from 'state'

interface BF_FieldsetModel {
    name: string | null
    description: string | null
    fields: Field[]
}

export { BF_FieldsetModel }

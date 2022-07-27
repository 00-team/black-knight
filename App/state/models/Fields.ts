import { VImage, TValue, VDate, PK, VForeignKey } from 'state'

interface BaseField {
    name: string
}

interface CharField extends BaseField {
    type: 'char'
    max: number
    default: string
    value?: string
}

interface BooleanField extends BaseField {
    type: 'boolean'
    default: boolean
    value?: boolean
}

interface IntField extends BaseField {
    type: 'int'
    min: number
    default: '' | number
    value?: number
}

interface ImageField extends BaseField {
    type: 'image'
    default: ''
    value?: VImage
}

interface TextField extends BaseField {
    type: 'text'
    default: string
    value?: string
}

interface DateField extends BaseField {
    type: 'date'
    default: string
    value?: VDate
}

interface DateTimeField extends BaseField {
    type: 'datetime'
    default: string
    value?: VDate
}

interface ForeignKeyField extends BaseField {
    type: 'foreign_key'
    choices: [PK, string][]
    value?: VForeignKey
}

interface UnknownField extends BaseField {
    type: 'unknown'
}

interface ReadonlyField extends BaseField {
    type: 'readonly'
    value?: TValue
}

type Field =
    | CharField
    | BooleanField
    | TextField
    | IntField
    | ImageField
    | DateField
    | DateTimeField
    | ForeignKeyField
    | UnknownField
    | ReadonlyField

export { Field }

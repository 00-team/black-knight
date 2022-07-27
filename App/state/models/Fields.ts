import { VImage, TValue, VDate } from 'state'

interface BaseField {
    name: string
}

interface CharField extends BaseField {
    type: 'char'
    max: number
    default: string
    value?: string
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

interface UnknownField extends BaseField {
    type: 'unknown'
}

interface ReadonlyField extends BaseField {
    type: 'readonly'
    value?: TValue
}

type Field =
    | CharField
    | TextField
    | IntField
    | ImageField
    | DateField
    | UnknownField
    | ReadonlyField

export { Field }

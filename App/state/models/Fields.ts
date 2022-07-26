import { TBaseValue, TValue } from 'state'

interface BaseField {
    name: string
    default: TBaseValue
    value?: TValue
}

interface CharField extends BaseField {
    type: 'char'
    max: number
}

interface IntField extends BaseField {
    type: 'int'
    min: number
}

interface OtherField extends BaseField {
    type: 'text' | 'image' | 'date'
}

interface UnknownField extends BaseField {
    type: 'unknown'
}

interface ReadonlyField extends BaseField {
    type: 'readonly'
}

type Field = CharField | IntField | OtherField | UnknownField | ReadonlyField

export { Field }

import { VImage, TValue, VDate, PK, VForeignKey, VDatetime } from 'state'

interface BaseField<T, I = '' | T, C = T> {
    name: string
    label: string
    required: boolean
    help_text: string
    initial: I
    value?: T
    choices?: [C, string][]
}

interface CharField extends BaseField<string> {
    type: 'char'
    max_length: number
}

interface BooleanField extends BaseField<boolean, boolean> {
    type: 'boolean'
}

interface IntField extends BaseField<number> {
    type: 'int'
    min: number
}

interface ImageField extends BaseField<VImage> {
    type: 'image'
}

interface TextField extends BaseField<string> {
    type: 'text'
}

interface DateField extends BaseField<VDate, string> {
    type: 'date'
}

interface DateTimeField extends BaseField<VDatetime, string> {
    type: 'datetime'
}

interface ForeignKeyField extends Omit<BaseField<VForeignKey>, 'choices'> {
    type: 'foreign_key'
    choices: [PK, string][]
}

interface UnknownField {
    name: string
    type: 'unknown'
}

interface ReadonlyField {
    name: string
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

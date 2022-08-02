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

interface IntegerField extends BaseField<number> {
    type: 'integer'
    min: number
    max: number
}

interface ImageField extends BaseField<VImage, string, string> {
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

interface ForeignKeyField extends Omit<BaseField<VForeignKey, PK>, 'choices'> {
    type: 'foreign_key'
    choices: [PK, string][]
}

interface UnknownField {
    name: string
    type: 'unknown'
}

interface ReadOnlyField {
    name: string
    type: 'readonly'
    value?: TValue
}

type Field =
    | CharField
    | BooleanField
    | TextField
    | IntegerField
    | ImageField
    | DateField
    | DateTimeField
    | ForeignKeyField
    | UnknownField
    | ReadOnlyField

export { Field as FieldModel }
export {
    CharField as CharFieldModel,
    BooleanField as BooleanFieldModel,
    TextField as TextFieldModel,
    IntegerField as IntegerFieldModel,
    ImageField as ImageFieldModel,
    DateField as DateFieldModel,
    DateTimeField as DateTimeFieldModel,
    ForeignKeyField as ForeignKeyFieldModel,
    UnknownField as UnknownFieldModel,
    ReadOnlyField as ReadOnlyFieldModel,
}

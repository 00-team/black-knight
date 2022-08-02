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

// ================ TEXT ================
interface CharField extends BaseField<string> {
    type: 'char'
    max_length: number
}

interface TextField extends BaseField<string> {
    type: 'text'
}

interface DurationField extends BaseField<string> {
    type: 'duration'
}

interface GenericIPAddressField extends BaseField<string> {
    type: 'ip_address'
    protocol: 'both' | 'ipv4' | 'ipv6'
}

// ================ NUMB ================
interface BooleanField extends BaseField<boolean, boolean> {
    type: 'boolean'
}

interface IntegerField extends BaseField<number> {
    type: 'integer'
    min: number
    max: number
}

interface DecimalField extends BaseField<string> {
    type: 'decimal'
    max_digits: number
    decimal_places: number
}

interface FloatField extends BaseField<number> {
    type: 'float'
}

// ================ FILE ================
interface ImageField extends BaseField<VImage, string, string> {
    type: 'image'
}

// ================ DATE ================
interface DateField extends BaseField<VDate, string> {
    type: 'date'
}

interface DateTimeField extends BaseField<VDatetime, string> {
    type: 'datetime'
}

// ================ RELA ================
interface ForeignKeyField extends Omit<BaseField<VForeignKey, PK>, 'choices'> {
    type: 'foreign_key'
    choices: [PK, string][]
}

// ================ OTHE ================
interface UnknownField {
    name: string
    type: 'unknown'
}

interface ReadOnlyField {
    name: string
    type: 'readonly'
    value?: TValue
}

// ================ FIELD ================
type Field =
    // TEXT
    | CharField
    | TextField
    | DurationField
    | GenericIPAddressField
    // NUMB
    | BooleanField
    | IntegerField
    | DecimalField
    | FloatField
    // FILE
    | ImageField
    // DATE
    | DateField
    | DateTimeField
    // RELA
    | ForeignKeyField
    // OTHE
    | UnknownField
    | ReadOnlyField

export { Field as FieldModel }
export {
    // TEXT
    CharField as CharFieldModel,
    TextField as TextFieldModel,
    DurationField as DurationFieldModel,
    GenericIPAddressField as GenericIPAddressFieldModel,
    // NUMB
    BooleanField as BooleanFieldModel,
    IntegerField as IntegerFieldModel,
    DecimalField as DecimalFieldModel,
    FloatField as FloatFieldModel,
    // FILE
    ImageField as ImageFieldModel,
    // DATE
    DateField as DateFieldModel,
    DateTimeField as DateTimeFieldModel,
    // RELA
    ForeignKeyField as ForeignKeyFieldModel,
    // OTHE
    UnknownField as UnknownFieldModel,
    ReadOnlyField as ReadOnlyFieldModel,
}

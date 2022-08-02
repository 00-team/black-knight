import { VImage, TValue, VDate, VFile, PK, VForeignKey, VDatetime } from 'state'

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

interface UrlField extends BaseField<string> {
    type: 'url'
    max_length: number
}

interface SlugField extends BaseField<string> {
    type: 'slug'
    max_length: number
    allow_unicode: boolean
}

interface TextField extends BaseField<string> {
    type: 'text'
}

interface JsonField extends BaseField<string> {
    type: 'json'
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

interface FileField extends BaseField<VFile, string, string> {
    type: 'file'
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
    | UrlField
    | SlugField
    | TextField
    | JsonField
    | DurationField
    | GenericIPAddressField
    // NUMB
    | BooleanField
    | IntegerField
    | DecimalField
    | FloatField
    // FILE
    | ImageField
    | FileField
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
    SlugField as SlugFieldModel,
    UrlField as UrlFieldModel,
    TextField as TextFieldModel,
    JsonField as JsonFieldModel,
    DurationField as DurationFieldModel,
    GenericIPAddressField as GenericIPAddressFieldModel,
    // NUMB
    BooleanField as BooleanFieldModel,
    IntegerField as IntegerFieldModel,
    DecimalField as DecimalFieldModel,
    FloatField as FloatFieldModel,
    // FILE
    ImageField as ImageFieldModel,
    FileField as FileFieldModel,
    // DATE
    DateField as DateFieldModel,
    DateTimeField as DateTimeFieldModel,
    // RELA
    ForeignKeyField as ForeignKeyFieldModel,
    // OTHE
    UnknownField as UnknownFieldModel,
    ReadOnlyField as ReadOnlyFieldModel,
}

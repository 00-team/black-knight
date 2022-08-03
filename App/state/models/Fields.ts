import {
    VImage,
    TValue,
    VDate,
    VFile,
    PK,
    VForeignKey,
    VDateTime,
    VTime,
} from 'state'

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
    max_length?: number
}
interface UrlField extends CharField {
    validation: 'url'
}
interface SlugField extends CharField {
    validation: 'slug'
    allow_unicode: boolean
}
interface EmailField extends CharField {
    validation: 'email'
}
interface DurationField extends CharField {
    validation: 'duration'
}
interface UUIDField extends CharField {
    validation: 'uuid'
}
interface GenericIPAddressField extends CharField {
    validation: 'ip_address'
    protocol: 'both' | 'ipv4' | 'ipv6'
}

type CharBasedFields =
    | CharField
    | UrlField
    | SlugField
    | EmailField
    | DurationField
    | UUIDField
    | GenericIPAddressField

interface TextField extends BaseField<string> {
    type: 'text'
}

interface JsonField extends BaseField<string> {
    type: 'json'
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

interface FilePathField extends Omit<BaseField<string>, 'choices'> {
    type: 'file_path'
    choices: [string, string][]
}

// ================ DATE ================
interface DateField extends BaseField<VDate, string> {
    type: 'date'
}

interface DateTimeField extends BaseField<VDateTime, string> {
    type: 'datetime'
}

interface TimeField extends BaseField<VTime, string> {
    type: 'time'
}

// ================ RELA ================
interface ForeignKeyField extends Omit<BaseField<VForeignKey, PK>, 'choices'> {
    type: 'foreign_key'
    choices: [PK, string][]
}

// ================ OTHE ================
interface UnknownField {
    name: string
    label: string
    type: 'unknown'
}

interface ReadOnlyField {
    name: string
    label: string
    type: 'readonly'
    value?: TValue
}

// ================ FIELD ================
type Field =
    // TEXT
    | CharBasedFields
    | TextField
    | JsonField
    // NUMB
    | BooleanField
    | IntegerField
    | DecimalField
    | FloatField
    // FILE
    | ImageField
    | FileField
    | FilePathField
    // DATE
    | DateField
    | DateTimeField
    | TimeField
    // RELA
    | ForeignKeyField
    // OTHE
    | UnknownField
    | ReadOnlyField

export { Field as FieldModel, CharBasedFields as CharBasedFieldsModel }
export {
    // TEXT
    TextField as TextFieldModel,
    JsonField as JsonFieldModel,
    // NUMB
    BooleanField as BooleanFieldModel,
    IntegerField as IntegerFieldModel,
    DecimalField as DecimalFieldModel,
    FloatField as FloatFieldModel,
    // FILE
    ImageField as ImageFieldModel,
    FileField as FileFieldModel,
    FilePathField as FilePathFieldModel,
    // DATE
    DateField as DateFieldModel,
    DateTimeField as DateTimeFieldModel,
    TimeField as TimeFieldModel,
    // RELA
    ForeignKeyField as ForeignKeyFieldModel,
    // OTHE
    UnknownField as UnknownFieldModel,
    ReadOnlyField as ReadOnlyFieldModel,
}

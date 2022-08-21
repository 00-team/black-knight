import type {
    D_ALL,
    PK,
    V_Bool,
    V_Date,
    V_DateTime,
    V_Decimal,
    V_File,
    V_Image,
    V_Time,
    V_TimeDelta,
} from 'state'

interface BaseField<Value, Init = '' | Value, Choice = Value> {
    name: string
    label: string
    required: boolean
    help_text: string
    initial: Init
    value?: Value
    choices?: [Choice, string][]
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
    | UUIDField
    | GenericIPAddressField

interface TextField extends BaseField<string> {
    type: 'text'
}

interface JsonField extends BaseField<string> {
    type: 'json'
}

// ================ NUMB ================
interface BooleanField extends BaseField<V_Bool, V_Bool> {
    type: 'boolean'
}

interface IntegerField extends BaseField<number> {
    type: 'integer'
    min: number
    max: number
}

interface DecimalField extends BaseField<V_Decimal> {
    type: 'decimal'
    max_digits: number
    decimal_places: number
}

interface FloatField extends BaseField<number> {
    type: 'float'
}

// ================ FILE ================
interface ImageField extends BaseField<V_Image, string, string> {
    type: 'image'
}

interface FileField extends BaseField<V_File, string, string> {
    type: 'file'
}

interface FilePathField extends Omit<BaseField<string>, 'choices'> {
    type: 'file_path'
    choices: [string, string][]
}

// ================ DATE ================
interface DateField extends BaseField<V_Date, string> {
    type: 'date'
}
interface DateTimeField extends BaseField<V_DateTime, string> {
    type: 'datetime'
}
interface TimeField extends BaseField<V_Time, string> {
    type: 'time'
}
interface DurationField extends BaseField<V_TimeDelta> {
    type: 'duration'
}

// ================ RELA ================
interface ForeignKeyField extends Omit<BaseField<PK, PK | null>, 'choices'> {
    type: 'foreign_key'
    choices: [PK, string][]
}

interface ManyToManyField extends Omit<BaseField<PK[], PK[]>, 'choices'> {
    type: 'many_to_many'
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
    value?: D_ALL
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
    | DurationField
    // RELA
    | ForeignKeyField
    | ManyToManyField
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
    DurationField as DurationFieldModel,
    // RELA
    ForeignKeyField as ForeignKeyFieldModel,
    ManyToManyField as ManyToManyFieldModel,
    // OTHE
    UnknownField as UnknownFieldModel,
    ReadOnlyField as ReadOnlyFieldModel,
}

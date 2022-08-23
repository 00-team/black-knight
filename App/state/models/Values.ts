type PK = string | number

type V_Image = string | null
type V_File = string | null
type V_Null = null
type V_Json = string
type V_Bool = boolean
type V_DateTime = string
type V_Date = string
type V_Time = string
type V_TimeDelta = string
type V_Integer = number
type V_Decimal = string
type V_Float = number
type V_Html = string
type V_Char = string

type D_Image = ['image', V_Image]
type D_File = ['file', V_File]
type D_Null = ['null', null]
type D_ForeignKey = ['foreign_key', string, string]
type D_ManyToMany = ['many_to_many', [string, string][]]
type D_Json = ['json', string]
type D_Bool = ['bool', boolean]
type D_DateTime = ['datetime', string]
type D_Date = ['date', string]
type D_Time = ['time', string]
type D_TimeDelta = ['timedelta', string]
type D_Integer = ['integer', number]
type D_Decimal = ['decimal', string]
type D_Float = ['float', number]
type D_Html = ['html', string]
type D_Char = ['char', string]
type D_Url = ['url', string]

type D_ALL =
    | D_Image
    | D_File
    | D_Null
    | D_ForeignKey
    | D_ManyToMany
    | D_Json
    | D_Bool
    | D_DateTime
    | D_Date
    | D_Time
    | D_TimeDelta
    | D_Integer
    | D_Decimal
    | D_Float
    | D_Html
    | D_Char
    | D_Url

export type { PK }
export type {
    V_Image,
    V_File,
    V_Null,
    V_Json,
    V_Bool,
    V_DateTime,
    V_Date,
    V_Time,
    V_TimeDelta,
    V_Integer,
    V_Decimal,
    V_Float,
    V_Html,
    V_Char,
}
export type {
    D_ALL,
    D_Image,
    D_File,
    D_Null,
    D_ForeignKey,
    D_ManyToMany,
    D_Json,
    D_Bool,
    D_DateTime,
    D_Date,
    D_Time,
    D_TimeDelta,
    D_Integer,
    D_Decimal,
    D_Float,
    D_Html,
    D_Char,
    D_Url,
}

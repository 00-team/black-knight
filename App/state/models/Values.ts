type PK = string | number

type V_Image = string | null
type V_File = string | null
type V_Null = null
type V_ForeignKey = [PK, string]
type V_ManyToMany = [PK, string][]
type V_Json = string
type V_Choice = unknown
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

type VWT_Image = ['image', V_Image]
type VWT_File = ['file', V_File]
type VWT_Null = ['null', V_Null]
type VWT_ForeignKey = ['foreign_key', ...V_ForeignKey]
type VWT_ManyToMany = ['many_to_many', V_ManyToMany]
type VWT_Json = ['json', V_Json]
type VWT_Choice = ['choice', V_Choice]
type VWT_Bool = ['bool', V_Bool]
type VWT_DateTime = ['datetime', V_DateTime]
type VWT_Date = ['date', V_Date]
type VWT_Time = ['time', V_Time]
type VWT_TimeDelta = ['timedelta', V_TimeDelta]
type VWT_Integer = ['integer', V_Integer]
type VWT_Decimal = ['decimal', V_Decimal]
type VWT_Float = ['float', V_Float]
type VWT_Html = ['html', V_Html]
type VWT_Char = ['char', V_Char]

type VWT_ALL =
    | VWT_Image
    | VWT_File
    | VWT_Null
    | VWT_ForeignKey
    | VWT_ManyToMany
    | VWT_Json
    | VWT_Choice
    | VWT_Bool
    | VWT_DateTime
    | VWT_Date
    | VWT_Time
    | VWT_TimeDelta
    | VWT_Integer
    | VWT_Decimal
    | VWT_Float
    | VWT_Html
    | VWT_Char

export type { PK }
export type {
    V_Image,
    V_File,
    V_Null,
    V_ForeignKey,
    V_ManyToMany,
    V_Json,
    V_Choice,
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
    VWT_ALL,
    VWT_Image,
    VWT_File,
    VWT_Null,
    VWT_ForeignKey,
    VWT_ManyToMany,
    VWT_Json,
    VWT_Choice,
    VWT_Bool,
    VWT_DateTime,
    VWT_Date,
    VWT_Time,
    VWT_TimeDelta,
    VWT_Integer,
    VWT_Decimal,
    VWT_Float,
    VWT_Html,
    VWT_Char,
}

export * from './Admin'
export * from './BraceForm'
export * from './BraceList'
export * from './Fields'
export * from './Log'
export * from './User'
export type { ProgressModel }
export type { PK, TLoading, TValue, TBaseValue, TypedValues }
export type {
    VImage,
    VDate,
    VDateTime,
    VTime,
    VLink,
    VForeignKey,
    VFile,
    VManyToMany,
}

interface ProgressModel {
    done: boolean
    percentage: number
    total: number
    loaded: number
}

type PK = string | number

type TLoading = ['loading', string]

type VImage = ['image', string | null]
type VFile = ['file', string | null]
type VDate = ['date', string]
type VDateTime = ['datetime', string]
type VTime = ['time', string]
type VLink = ['link', string]
type VForeignKey = ['foreign_key', PK, string]
type VManyToMany = ['many_to_many', PK[]]

type TBaseValue = string | number | boolean | null
type TypedValues =
    | VImage
    | VDate
    | VTime
    | VDateTime
    | VLink
    | VForeignKey
    | VManyToMany
    | VFile
type TValue = TBaseValue | TypedValues

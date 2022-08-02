export * from './User'
export * from './Admin'
export * from './Log'
export * from './BraceList'
export * from './BraceForm'
export * from './Fields'

type PK = string | number

type TLoading = ['loading', string]

type VImage = ['image', string | null]
type VFile = ['file', string | null]
type VDate = ['date', string]
type VDatetime = ['datetime', string]
type VLink = ['link', string]
type VForeignKey = ['foreign_key', PK, string]

type TBaseValue = string | number | boolean | null
type TypedValues = VImage | VDate | VDatetime | VLink | VForeignKey | VFile
type TValue = TBaseValue | TypedValues

export { PK, TLoading, TValue, TBaseValue, TypedValues }
export { VImage, VDate, VDatetime, VLink, VForeignKey, VFile }

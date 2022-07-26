export * from './User'
export * from './Admin'
export * from './Log'
export * from './BraceList'
export * from './BraceForm'
export * from './Fields'

type PK = string | number
type TLoading = ['loading', string]

type VImage = ['image', string | null]
type VDate = ['date', string]
type VDatetime = ['datetime', string]
type VLink = ['link', string]

type TBaseValue = string | number | boolean | null
type TypedValues = VImage | VDate | VDatetime | VLink
type TValue = TBaseValue | TypedValues

export { PK, TLoading, TValue, TBaseValue, TypedValues }

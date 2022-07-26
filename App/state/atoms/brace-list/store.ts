import { atom } from 'jotai'
import { BL_InfoModel, BL_ResultModel } from 'state'
import { TLoading, PK_MAP, PK } from 'state'

const Loading: TLoading = ['loading', 'None']

const Result = atom<BL_ResultModel | TLoading>(Loading)
const Info = atom<BL_InfoModel | TLoading>(Loading)
const Select = atom<'all' | PK[]>([])
const PKMap = atom<PK_MAP | 'loading'>('loading')

export { Result, Info, Select, PKMap }

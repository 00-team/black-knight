import { atom } from 'jotai'
import { BraceInfoModel, BraceListModel } from 'state/models'
import { TLoading, TPKMap, PK } from 'state/models'

const Loading: TLoading = ['loading', 'None']

const Result = atom<BraceListModel | TLoading>(Loading)
const Info = atom<BraceInfoModel | TLoading>(Loading)
const Select = atom<'all' | PK[]>([])
const PKMap = atom<TPKMap | 'loading'>('loading')

export { Result, Info, Select, PKMap }

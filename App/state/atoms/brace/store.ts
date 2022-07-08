import { atom } from 'jotai'
import { BraceInfoModel, BraceListModel, PK } from 'state/models'

type TLoading = ['loading', string]
const Loading: TLoading = ['loading', 'None']

const Result = atom<BraceListModel | TLoading>(Loading)
const Info = atom<BraceInfoModel | TLoading>(Loading)
const Select = atom<'all' | PK[]>([])

export { Result, Info, Select }

import { atom } from 'jotai'
import { BF_FieldsetModel } from 'state'
import { TLoading } from 'state'

const Loading: TLoading = ['loading', 'None']

const Fieldsets = atom<{ fieldsets: BF_FieldsetModel[] } | TLoading>(Loading)

export { Fieldsets }

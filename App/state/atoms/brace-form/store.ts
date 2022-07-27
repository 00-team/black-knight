import { atom } from 'jotai'
import { BraceFormModel } from 'state'
import { TLoading } from 'state'

const Loading: TLoading = ['loading', 'None']

const BraceForm = atom<BraceFormModel | TLoading>(Loading)

export { BraceForm }

import { atom } from 'jotai'
import { TLoading, BraceFormModel } from 'state'

const Loading: TLoading = ['loading', 'None']

const Form = atom<BraceFormModel | TLoading>(Loading)
const SubmitData = atom<FormData>(new FormData())

export { Form, SubmitData }

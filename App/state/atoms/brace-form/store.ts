import { atom } from 'jotai'
import { TLoading, BraceFormModel, SubmitOptions } from 'state'

const Loading: TLoading = ['loading', 'None']

const Form = atom<BraceFormModel | TLoading>(Loading)
const SubmitData = atom<SubmitOptions>({})

export { Form, SubmitData }

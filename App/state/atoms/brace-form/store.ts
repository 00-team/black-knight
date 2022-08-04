import { atom } from 'jotai'
import {
    TLoading,
    BraceFormModel,
    BraceFormErrorsModel,
    SubmitOptions,
} from 'state'

const Loading: TLoading = ['loading', 'None']

const Form = atom<BraceFormModel | TLoading>(Loading)
const FormErrors = atom<BraceFormErrorsModel | null>(null)
const SubmitData = atom<SubmitOptions>({})

export { Form, SubmitData, FormErrors }

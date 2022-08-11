import { atom } from 'jotai'
import {
    BraceFormErrorsModel,
    BraceFormModel,
    ProgressModel,
    SubmitOptions,
    TLoading,
} from 'state'

type TNotFound = ['not-found', string]

const Loading: TLoading = ['loading', 'None']

const Form = atom<BraceFormModel | TLoading | TNotFound>(Loading)
const FormErrors = atom<BraceFormErrorsModel | null>(null)
const SubmitData = atom<SubmitOptions>({})
const SubmitProgress = atom<ProgressModel | null>(null)

export { Form, SubmitData, FormErrors, SubmitProgress }

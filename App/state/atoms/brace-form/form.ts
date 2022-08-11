import { atom } from 'jotai'
import { PK, REQUEST } from 'state'

import { Form, FormErrors } from './store'

var BraceFormController: AbortController | null = null

interface BraceFormArgs {
    app_label?: string
    model_name?: string
    pk?: PK
}

const BraceFormAtom = atom(
    async get => {
        const form = get(Form)
        if (Array.isArray(form)) return form[0]
        return form
    },

    async (get, set, args: BraceFormArgs) => {
        if (!args.app_label || !args.model_name) return
        const app_model = `${args.app_label}/${args.model_name}`

        let url = `api/${app_model}/brace-form/`
        if (args.pk === undefined) url += 'add/'
        else url += `change/?pk=${args.pk}`

        if (BraceFormController) BraceFormController.abort()
        BraceFormController = new AbortController()

        set(Form, ['loading', app_model])

        const response = await REQUEST({
            url,
            signal: BraceFormController.signal,
        })

        if (response.ok) {
            const fieldsets = get(Form)
            if (Array.isArray(fieldsets) && fieldsets[1] !== app_model) return

            set(Form, response.data)
            // console.log(response.data.fieldsets[0].fields)
        } else {
            if (response.error.code === 404) {
                set(Form, ['not-found', app_model])
            }
            // if (response.code === 20) {
            //     // ignore signal abort exceptions
            //     return
            // }
            // console.log('Error brace form')
            // console.log(response)
        }
        // else set(User, response.error)

        // reset the select state
    }
)

// const BFErrorsAtom = atom(FormErrors)

export { BraceFormAtom, FormErrors as BFErrorsAtom }

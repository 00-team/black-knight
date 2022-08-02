import { atom } from 'jotai'
import { REQUEST } from 'state'

import { Form } from './store'

var BraceFormController: AbortController | null = null

interface BraceFormArgs {
    app_label?: string
    model_name?: string
    end_url: 'add/' | string
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

        if (BraceFormController) BraceFormController.abort()
        BraceFormController = new AbortController()

        set(Form, ['loading', app_model])

        const response = await REQUEST({
            url: `api/${app_model}/brace-form/${args.end_url}`,
            signal: BraceFormController.signal,
        })

        if (response.ok) {
            const fieldsets = get(Form)
            if (Array.isArray(fieldsets) && fieldsets[1] !== app_model) return

            set(Form, response.data)
            // console.log(response.data.fieldsets[0].fields)
        } else {
            if (response.code === 20) {
                // ignore signal abort exceptions
                return
            }
            console.log('Error brace form')
            console.log(response)
        }
        // else set(User, response.error)

        // reset the select state
    }
)

export { BraceFormAtom }

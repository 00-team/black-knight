import { atom } from 'jotai'
import { REQUEST } from 'state'

import { BraceForm } from './store'

var BraceFormController: AbortController | null = null

interface BraceFormArgs {
    app_label?: string
    model_name?: string
    end_url: 'add/' | string
}

const BraceFormAtom = atom(
    async get => {
        const form = get(BraceForm)
        if (Array.isArray(form)) return form[0]
        return form
    },

    async (get, set, args: BraceFormArgs) => {
        if (!args.app_label || !args.model_name) return
        const app_model = `${args.app_label}/${args.model_name}`

        if (BraceFormController) BraceFormController.abort()
        BraceFormController = new AbortController()

        set(BraceForm, ['loading', app_model])

        const response = await REQUEST(
            `api/${app_model}/brace-form/${args.end_url}`,
            'GET',
            BraceFormController.signal
        )

        if (response.ok) {
            const fieldsets = get(BraceForm)
            if (Array.isArray(fieldsets) && fieldsets[1] !== app_model) return

            set(BraceForm, response.data)
        } else {
            console.log('Error ...')
        }
        // else set(User, response.error)

        // reset the select state
    }
)

export { BraceFormAtom }

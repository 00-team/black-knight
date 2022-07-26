import { atom } from 'jotai'
// import {  } from 'state'
import { REQUEST } from 'state'

import { Fieldsets } from './store'

// this name has to be unique because it a var
var BF_FieldsetsCTRL: AbortController | null = null

// interface Options {
//     app_model?: string // app_label/model_name
//     search?: string
//     page?: string | number
//     orders?: string[]
// }

// const ResultOptions = atom<Options>({})
// const ResultOptionsAtom = atom(
//     get => get(ResultOptions),
//     (get, set, options: Options) => {
//         const current_opts = get(ResultOptions)
//         if (options.app_model && current_opts.app_model !== options.app_model)
//             set(ResultOptions, options)
//         set(ResultOptions, { ...get(ResultOptions), ...options })
//     }
// )

const BraceFieldsetsAtom = atom(
    async get => {
        const fieldsets = get(Fieldsets)
        if (Array.isArray(fieldsets)) return fieldsets[0]
        return fieldsets
    },

    async (get, set, app_model: string) => {
        // const { app_model, ...opt } = get(ResultOptionsAtom)
        if (!app_model) return

        // cancelling the previous request if exists.
        if (BF_FieldsetsCTRL) BF_FieldsetsCTRL.abort()
        BF_FieldsetsCTRL = new AbortController()

        // set(PKMap, 'loading')
        set(Fieldsets, ['loading', app_model])
        // set(Select, [])

        const response = await REQUEST(
            `api/${app_model}/brace-form/add/`,
            'GET',
            BF_FieldsetsCTRL.signal
            // opt
        )

        if (response.ok) {
            const fieldsets = get(Fieldsets)
            if (Array.isArray(fieldsets) && fieldsets[1] !== app_model) return

            // // updating the PK Map
            // const result_list: ResultModel[] = response.data.results
            // const pk_map: PK_MAP = {}
            // result_list.forEach((item, index) => {
            //     pk_map[index] = item[0]
            // })
            // set(PKMap, pk_map)

            // updating the results
            set(Fieldsets, response.data)
        } else {
            console.log('Error ...')
        }
        // else set(User, response.error)

        // reset the select state
    }
)

export { BraceFieldsetsAtom }

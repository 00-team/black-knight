import { atom } from 'jotai'
import { PK_MAP, REQUEST, ResultModel } from 'state'

import { PKMap, Result, Select } from './store'

var BraceResultController: AbortController | null = null

interface Options {
    app_model?: string // app_label/model_name
    search?: string
    page?: string | number
    orders?: string[]
}

const ResultOptions = atom<Options>({})
const ResultOptionsAtom = atom(
    get => get(ResultOptions),
    (get, set, options: Options) => {
        const current_opts = get(ResultOptions)
        if (options.app_model && current_opts.app_model !== options.app_model)
            set(ResultOptions, options)
        set(ResultOptions, { ...get(ResultOptions), ...options })
    }
)

const BraceResultAtom = atom(
    async get => {
        const results = get(Result)
        if (Array.isArray(results)) return results[0]
        return results
    },

    async (get, set, _) => {
        const { app_model, ...opt } = get(ResultOptionsAtom)
        if (!app_model) return

        // cancelling the previous request if exists.
        if (BraceResultController) BraceResultController.abort()
        BraceResultController = new AbortController()

        set(PKMap, 'loading')
        set(Result, ['loading', app_model])
        set(Select, [])

        const response = await REQUEST({
            url: `api/${app_model}/brace-result/`,
            method: 'POST',
            signal: BraceResultController.signal,
            data: opt,
        })

        if (response.ok) {
            const results = get(Result)
            if (Array.isArray(results) && results[1] !== app_model) return

            // updating the PK Map
            const result_list: ResultModel[] = response.data.results
            const pk_map: PK_MAP = {}
            result_list.forEach((item, index) => {
                pk_map[index] = item[0]
            })
            set(PKMap, pk_map)

            // updating the results
            set(Result, response.data)
        } else {
            if (response.code === 20) {
                // ignore signal abort exceptions
                return
            }
            console.log(response)
        }
        // else set(User, response.error)

        // reset the select state
    }
)

export { BraceResultAtom, ResultOptionsAtom }
export { PKMap as PKMapAtom }

import { atom } from 'jotai'
import { ResultModel, TPKMap } from 'state/models'
import { GET } from 'state/utils'

import { Result, Select, PKMap } from './store'

var BraceResultController: AbortController | null = null

interface BraceResultUpdateParams {
    app_model: string // app_label/model_name
    search?: string
}

const BraceResultAtom = atom(
    async get => {
        const results = get(Result)
        if (Array.isArray(results)) return results[0]
        return results
    },

    async (get, set, args: BraceResultUpdateParams) => {
        const app_model = args.app_model
        if (!app_model) return
        const params = new URLSearchParams()
        // let filters = ''
        // let orders = ''

        if (args.search) params.set('q', args.search)

        // cancelling the previous request if exists.
        if (BraceResultController) BraceResultController.abort()
        BraceResultController = new AbortController()

        set(PKMap, 'loading')
        set(Result, ['loading', app_model])
        set(Select, [])

        const response = await GET(`api/${app_model}/braceresult/`, {
            signal: BraceResultController.signal,
            params,
        })
        if (response.ok) {
            const results = get(Result)
            if (Array.isArray(results) && results[1] !== app_model) return

            // updating the PK Map
            const result_list: ResultModel[] = response.data.results
            const pk_map: TPKMap = {}
            result_list.forEach((item, index) => {
                pk_map[index] = item[0]
            })
            set(PKMap, pk_map)

            // updating the results
            set(Result, response.data)
        }
        // else set(User, response.error)

        // reset the select state
    }
)

export { BraceResultAtom, BraceResultUpdateParams }
export { PKMap as PKMapAtom }

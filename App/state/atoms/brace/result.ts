import { atom } from 'jotai'
import { ResultModel, TPKMap } from 'state/models'
import { REQUEST } from 'state/utils'

import { Result, Select, PKMap } from './store'

var BraceResultController: AbortController | null = null

interface Args {
    app_model: string // app_label/model_name
    options?: Options
}

interface Options {
    search?: string
    page?: string | number
    orders?: string[]
}

const BraceResultAtom = atom(
    async get => {
        const results = get(Result)
        if (Array.isArray(results)) return results[0]
        return results
    },

    async (get, set, args: Args) => {
        const app_model = args.app_model
        if (!app_model) return
        const url = `api/${app_model}/brace-result/`
        // const params = new URLSearchParams()
        // let filters = ''
        // let orders = ''

        // if (args.search) params.set('q', args.search)

        // cancelling the previous request if exists.
        if (BraceResultController) BraceResultController.abort()
        BraceResultController = new AbortController()

        set(PKMap, 'loading')
        set(Result, ['loading', app_model])
        set(Select, [])

        const response = await REQUEST(
            url,
            'POST',
            BraceResultController.signal,
            args.options
        )

        if (response.ok) {
            // const data = await response.json()
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

export { BraceResultAtom }
export { PKMap as PKMapAtom }

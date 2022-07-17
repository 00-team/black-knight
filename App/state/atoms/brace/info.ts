import { atom } from 'jotai'
import { REQUEST } from 'state/utils'

import { Info } from './store'

var BraceInfoController: AbortController | null = null

const BraceInfoAtom = atom(
    async get => {
        const info = get(Info)
        if (Array.isArray(info)) return info[0]
        return info
    },

    async (get, set, app_model: string) => {
        if (!app_model) return

        // cancelling the previous request if exists.
        if (BraceInfoController) BraceInfoController.abort()
        BraceInfoController = new AbortController()

        set(Info, ['loading', app_model])

        const response = await REQUEST(
            `api/${app_model}/brace-info/`,
            'GET',
            BraceInfoController.signal
        )

        if (response.ok) {
            const info = get(Info)
            if (Array.isArray(info) && info[1] !== app_model) return
            set(Info, response.data)
        }

        // else set(User, response.error)
    }
)

export { BraceInfoAtom }

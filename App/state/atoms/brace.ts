import { atom } from 'jotai'

import { BraceListModel, DefaultBraceList, PK } from '../models'
import { BraceInfoModel, DefaultBraceInfo } from '../models'
import { GET } from '../utils'

var BraceListController: AbortController | null = null
var BraceInfoController: AbortController | null = null

const BraceList = atom<BraceListModel | ['loading', string]>(DefaultBraceList)
const BraceInfo = atom<BraceInfoModel | ['loading', string]>(DefaultBraceInfo)
const BraceSelect = atom<'all' | PK[]>([])

const BraceInfoAtom = atom(
    async get => {
        const brace_info = get(BraceInfo)
        if (Array.isArray(brace_info)) return brace_info[0]
        return brace_info
    },

    async (get, set, app_model: string) => {
        // cancelling the previous request if exists.
        if (BraceInfoController) BraceInfoController.abort()
        BraceInfoController = new AbortController()

        set(BraceInfo, ['loading', app_model])
        const response = await GET(`api/${app_model}/braceinfo/`, {
            signal: BraceInfoController.signal,
        })
        if (response.ok) {
            const brace_info = get(BraceInfo)
            if (Array.isArray(brace_info) && brace_info[1] !== app_model) return
            set(BraceInfo, response.data)
        }

        // else set(User, response.error)
    }
)

interface BraceListUpdate {
    app_model: string
    search?: string
}

const BraceListAtom = atom(
    async get => {
        const brace_list = get(BraceList)
        if (Array.isArray(brace_list)) return brace_list[0]
        return brace_list
    },

    async (get, set, args: string | BraceListUpdate) => {
        // app_model should be like this: app_label/model_name
        // e.g.: (auth/user)

        let app_model = ''
        const params = new URLSearchParams()
        // let filters = ''
        // let orders = ''

        if (typeof args === 'string') app_model = args
        else {
            app_model = args.app_model

            // ifparams.append('q', args.search)
            if (args.search) params.set('q', args.search)
        }

        // cancelling the previous request if exists.
        if (BraceListController) BraceListController.abort()
        BraceListController = new AbortController()

        set(BraceList, ['loading', app_model])
        set(BraceSelect, [])

        const response = await GET(`api/${app_model}/bracelist/`, {
            signal: BraceListController.signal,
            params,
        })
        if (response.ok) {
            const brace_list = get(BraceList)
            if (Array.isArray(brace_list) && brace_list[1] !== app_model) return
            set(BraceList, response.data)
        }
        // else set(User, response.error)

        // reset the select state
    }
)

interface TArgs {
    type: 'add' | 'remove'
    id: PK | 'all' | 'page'
}

const BraceSelectAtom = atom(
    get => get(BraceSelect),

    (get, set, { type, id }: TArgs) => {
        let selecteds = get(BraceSelect)

        if (id === 'all') {
            if (type === 'add') set(BraceSelect, 'all')
            else set(BraceSelect, [])
        } else if (id === 'page') {
            if (type === 'add') {
                const brace_list = get(BraceListAtom)
                if (brace_list === 'loading') return
                set(
                    BraceSelect,
                    brace_list.results.map(r => r[0])
                )
            } else set(BraceSelect, [])
        } else {
            if (selecteds === 'all') {
                if (type === 'remove') {
                    const brace_list = get(BraceListAtom)
                    if (brace_list === 'loading') return
                    // if all the item are selected and user removes one of them.
                    let page_ids = brace_list.results.map(r => r[0])
                    set(
                        BraceSelect,
                        page_ids.filter(item => item !== id)
                    )
                }
            } else {
                selecteds = selecteds.filter(item => item !== id)
                if (type === 'add') {
                    selecteds.push(id)
                }
                set(BraceSelect, selecteds)
            }
        }
    }
)

export { BraceListAtom, BraceSelectAtom, BraceInfoAtom }

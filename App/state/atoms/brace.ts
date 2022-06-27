import { atom } from 'jotai'

import { BraceListModel, DefaultBraceList, PK } from '../models'
import { GET } from '../utils'

const BraceList = atom<BraceListModel>(DefaultBraceList)
const BraceSelect = atom<'all' | PK[]>([])

const BraceListAtom = atom(
    async get => get(BraceList),

    async (_get, set, app_model: string) => {
        // app_model should be like this: app_label/model_name
        // e.g.: (auth/user)
        const response = await GET(`api/${app_model}/bracelist/`)
        if (response.ok) set(BraceList, response.data)
        // else set(User, response.error)

        // reset the select state
        set(BraceSelect, [])
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
            if (type === 'add')
                set(
                    BraceSelect,
                    get(BraceList).results.map(r => r[0])
                )
            else set(BraceSelect, [])
        } else {
            if (selecteds === 'all') {
                if (type === 'remove') {
                    // if all the item are selected and user removes one of them.
                    let page_ids = get(BraceList).results.map(r => r[0])
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

export { BraceListAtom, BraceSelectAtom }

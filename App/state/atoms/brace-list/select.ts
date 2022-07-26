import { BraceResultAtom } from '.'

import { atom } from 'jotai'
import { PK } from 'state'

import { Select } from './store'

interface TArgs {
    type: 'add' | 'remove'
    id: PK | 'all' | 'page'
}

const BraceSelectAtom = atom(
    get => get(Select),

    (get, set, { type, id }: TArgs) => {
        let selecteds = get(Select)

        if (id === 'all') {
            if (type === 'add') set(Select, 'all')
            else set(Select, [])
        } else if (id === 'page') {
            if (type === 'add') {
                const results = get(BraceResultAtom)
                if (results === 'loading') return
                set(
                    Select,
                    results.results.map(r => r[0])
                )
            } else set(Select, [])
        } else {
            if (selecteds === 'all') {
                if (type === 'remove') {
                    const results = get(BraceResultAtom)
                    if (results === 'loading') return
                    // if all the item are selected and user removes one of them.
                    let page_ids = results.results.map(r => r[0])
                    set(
                        Select,
                        page_ids.filter(item => item !== id)
                    )
                }
            } else {
                selecteds = selecteds.filter(item => item !== id)
                if (type === 'add') {
                    selecteds.push(id)
                }
                set(Select, selecteds)
            }
        }
    }
)

export { BraceSelectAtom }

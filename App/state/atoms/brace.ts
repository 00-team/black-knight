import { atom } from 'jotai'

import { BraceListModel, DefaultBraceList } from '../models'
import { GET } from '../utils'

const BraceList = atom<BraceListModel>(DefaultBraceList)

interface TArgs {
    app_label: string
    model_name: string
}

const BraceListAtom = atom(
    async get => get(BraceList),

    async (_get, set, { app_label, model_name }: TArgs) => {
        const response = await GET(
            `api/model_list/?app_label=${app_label}&model_name=${model_name}`
        )
        if (response.ok) set(BraceList, response.data)
        // else set(User, response.error)
    }
)

export { BraceListAtom }

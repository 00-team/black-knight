import { atom } from 'jotai'

import { ManiacListModel, DefaultManiacList } from '../models'
import { GET } from '../utils'

const ManiacList = atom<ManiacListModel>(DefaultManiacList)

interface TArgs {
    app_label: string
    model_name: string
}

const ManiacListAtom = atom(
    async get => get(ManiacList),

    async (_get, set, { app_label, model_name }: TArgs) => {
        const response = await GET(
            `api/model_list/?app_label=${app_label}&model_name=${model_name}`
        )
        if (response.ok) set(ManiacList, response.data)
        // else set(User, response.error)
    }
)

export { ManiacListAtom }

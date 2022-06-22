import { atom } from 'jotai'

import { MainhallListModel, DefaultMainhallList } from '../models'
import { GET } from '../utils'

const MainhallList = atom<MainhallListModel>(DefaultMainhallList)

interface TArgs {
    app_label: string
    model_name: string
}

const MainhallListAtom = atom(
    async get => get(MainhallList),

    async (_get, set, { app_label, model_name }: TArgs) => {
        const response = await GET(
            `api/model_list/?app_label=${app_label}&model_name=${model_name}`
        )
        if (response.ok) set(MainhallList, response.data)
        // else set(User, response.error)
    }
)

export { MainhallListAtom }

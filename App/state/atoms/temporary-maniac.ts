import { atom } from 'jotai'

import { GET } from '../utils'

const Maniac = atom<string[]>([])

interface TArgs {
    app_label: string
    model_name: string
}

const ManiacAtom = atom(
    async get => get(Maniac),

    async (_get, set, { app_label, model_name }: TArgs) => {
        const response = await GET(
            `api/model_list/?app_label=${app_label}&model_name=${model_name}`
        )
        if (response.ok) set(Maniac, response.data.instances)
        // else set(User, response.error)
    }
)

export { ManiacAtom }

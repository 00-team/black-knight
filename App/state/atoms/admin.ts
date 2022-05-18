import { atom } from 'jotai'

import { AdminModel, DefaultAdmin } from '../models'
import { GET } from '../utils'

const Admin = atom<AdminModel>(DefaultAdmin)

const AdminAtom = atom(
    async get => get(Admin),

    async (_get, set, _args) => {
        const response = await GET('api/index/')
        if (response.ok) set(Admin, response.data)
        // else set(User, response.error)
    }
)

export { AdminAtom }

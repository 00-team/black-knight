import { atom } from 'jotai'

import { DefaultUser, UserModel } from '../models'
import { GET } from '../utils'

const User = atom<UserModel>(DefaultUser)

const UserAtom = atom(
    async get => get(User),

    async (_get, set, _args) => {
        const response = await GET('api/user/')
        if (response.ok) set(User, response.data)
        // else set(User, response.error)
    }
)

export { UserAtom }

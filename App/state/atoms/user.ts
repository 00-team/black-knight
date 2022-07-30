import { atom } from 'jotai'

import { DefaultUser, UserModel } from '../models'
import { REQUEST } from '../utils'

const User = atom<UserModel>(DefaultUser)

const UserAtom = atom(
    async get => get(User),

    async (_get, set, _args) => {
        const response = await REQUEST({ url: 'api/user/' })
        if (response.ok) set(User, response.data)
        // else set(User, response.error)
    }
)

export { UserAtom }

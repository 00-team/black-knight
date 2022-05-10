import { atom } from 'jotai'
import { GET } from '../utils'
import { DefaultUser, UserModel } from '../models'

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

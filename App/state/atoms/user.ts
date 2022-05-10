import { atom } from 'jotai'
import { GET } from '../utils'

interface UserModel {
    username: string
    avatar: string
    email: string
    first_name: string
    last_name: string
}

const DefaultUser: UserModel = {
    username: 'Anonymous',
    avatar: '',
    email: '',
    first_name: '',
    last_name: '',
}

const User = atom<UserModel>(DefaultUser)

const UserAtom = atom(
    async get => get(User),

    async (_get, set, _args) => {
        const response = await GET('api/user/')
        if (response.ok) set(User, response.data)
        // else set(User, response.error)
    }
)

export { UserAtom, User }

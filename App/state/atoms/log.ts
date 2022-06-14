import { atom } from 'jotai'

import { LogModel } from '../models'
import { GET } from '../utils'

const Log = atom<LogModel[]>([])

const LogAtom = atom(
    async get => get(Log),

    async (_get, set, _args) => {
        const response = await GET('api/log/')
        if (response.ok) set(Log, response.data.logs)
        // else set(User, response.error)
    }
)

export { LogAtom }

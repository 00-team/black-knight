import { atom } from 'jotai'

import { LogModel } from '../models'
import { REQUEST } from '../utils'

const Log = atom<LogModel[]>([])

const LogAtom = atom(
    async get => get(Log),

    async (_get, set, _args) => {
        const response = await REQUEST({ url: 'api/log/' })
        if (response.ok) set(Log, response.data.logs)
        // else set(User, response.error)
    }
)

export { LogAtom }

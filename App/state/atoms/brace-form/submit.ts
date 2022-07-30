// import { BFSOptions } from 'state'
import { atom } from 'jotai'

import { SubmitData } from './store'

type DataArgs = [string, string | Blob]

// Brace Form Submit Data
const BFSData = atom(
    get => get(SubmitData),
    (get, set, args: DataArgs) => {
        const fd = get(SubmitData)
        fd.set(args[0], args[1])
        set(SubmitData, fd)
    }
)

export { BFSData }

import { atom } from 'jotai'
import { GET } from '../utils'

const MainAtom = atom(async _ => {
    const response = await GET('api/index/')
    if (response.ok) return response.data

    return response.error
})

export { MainAtom }

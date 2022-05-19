import { GET } from '../utils'

const Logout = async () => {
    const response = await GET('/api/logout')
    if (response.ok) location.replace('/')
    else alert(response.error.message)
}

export { Logout }

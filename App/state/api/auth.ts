import { GET, POST } from '../utils'

const Logout = async () => {
    const response = await GET('/api/logout/')
    if (response.ok) location.assign('/')
    else alert(response.message)
}

interface LoginData {
    username: string
    password: string
}

const Login = async (data: LoginData) => {
    const response = await POST('/api/login/', data)
    return response.ok
}

export { Logout, Login }

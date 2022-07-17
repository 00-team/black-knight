import { REQUEST } from '../utils'

const Logout = async () => {
    const response = await REQUEST('/api/logout/')
    if (response.ok) location.assign('/')
    else alert(response.message)
}

interface LoginData {
    username: string
    password: string
}

const Login = async (data: LoginData) => {
    const response = await REQUEST('/api/login/', 'POST', undefined, data)
    return response.ok
}

export { Logout, Login }

import { REQUEST } from '../utils'

const Logout = async () => {
    const response = await REQUEST({ url: '/api/logout/' })
    if (response.ok) location.assign('/')
    else alert(response.message)
}

interface LoginData {
    username: string
    password: string
}

const Login = async (body: LoginData) => {
    const response = await REQUEST({ url: '/api/login/', method: 'POST', body })
    return response.ok
}

export { Logout, Login }

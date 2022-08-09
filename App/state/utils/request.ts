import axios, { AxiosRequestConfig } from 'axios'
import { get as GetCookies } from 'js-cookie'

interface ResponseOk {
    ok: true
    data: any
}

interface ResponseError {
    ok: false
    message: string
    code: number
}

type Response = ResponseOk | ResponseError

const GetCSRFToken = () => {
    const csrftoken = GetCookies('csrftoken')
    if (!csrftoken) {
        location.reload()
        throw Error('CSRF Token Required.')
    }
    return { 'X-CSRFToken': csrftoken }
}

type TRequest = (
    config: AxiosRequestConfig<FormData | Object>
) => Promise<Response>
const REQUEST: TRequest = async config => {
    try {
        config.baseURL = BASE_URL

        if (config.method === 'POST') {
            config.headers = { ...GetCSRFToken(), ...config.headers }
        }

        const response = await axios.request(config)
        return { ok: true, data: response.data }
    } catch (error) {
        console.log(error)

        if (axios.isAxiosError(error)) {
            if (error.response) {
                return {
                    ok: false,
                    // @ts-ignore
                    ...error.response.data,
                }
            } else {
                return { ok: false, code: 400, message: error.message }
            }
        }

        return { ok: false, code: 400, message: 'Test Error' }
    }
}

export { REQUEST }

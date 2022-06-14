import axios, { AxiosRequestConfig } from 'axios'
import { get as GetCookies } from 'js-cookie'

const U = (url: string) => (BASE_URL + url).replaceAll('//', '/')

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

const HandleError = (error: unknown): ResponseError => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.data.message) return error.response.data

            return {
                ok: false,
                message: error.response.statusText,
                code: error.response.status,
            }
        }

        return {
            ok: false,
            message: error.message,
            code: 520,
        }
    }

    return { ok: false, message: 'An Unknown Error Happend!', code: 520 }
}

const GetCSRFToken = (config?: AxiosRequestConfig): AxiosRequestConfig => {
    const csrftoken = GetCookies('csrftoken')
    if (!csrftoken) {
        location.reload()
        throw Error('CSRF Token Required.')
    }
    const BaseHeaders = { 'X-CSRFToken': csrftoken }

    if (!config) return { headers: BaseHeaders }
    if (!config.headers) return { ...config, headers: BaseHeaders }
    if (!('X-CSRFToken' in config.headers))
        return { ...config, headers: { ...config.headers, ...BaseHeaders } }

    return config
}

type TGET = (url: string, config?: AxiosRequestConfig) => Promise<Response>
const GET: TGET = async (url, config) => {
    try {
        const { data } = await axios.get(U(url), config)
        return { ok: true, data }
    } catch (error) {
        return HandleError(error)
    }
}

type TPOST = (
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => Promise<Response>
const POST: TPOST = async (url, post_data, config) => {
    config = GetCSRFToken(config)

    try {
        const { data } = await axios.post(U(url), post_data, config)
        return { ok: true, data }
    } catch (error) {
        return HandleError(error)
    }
}

export { GET, POST }

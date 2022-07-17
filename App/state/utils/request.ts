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

const U = (url: string) => (BASE_URL + url).replaceAll('//', '/')

const GetCSRFToken = (): HeadersInit => {
    const csrftoken = GetCookies('csrftoken')
    if (!csrftoken) {
        location.reload()
        throw Error('CSRF Token Required.')
    }
    return { 'X-CSRFToken': csrftoken }
}

type TRequest = (
    url: string,
    method?: 'POST' | 'GET',
    signal?: AbortSignal,
    data?: Object
) => Promise<Response>
const REQUEST: TRequest = async (url, method, signal, data) => {
    try {
        method = method || 'GET'
        let body: null | BodyInit = null
        let headers: undefined | HeadersInit

        if (method === 'POST') {
            headers = GetCSRFToken()
            if (data) {
                body = JSON.stringify(data)
                headers = { ...headers, 'Content-Type': 'application/json' }
            }
        }

        const response = await fetch(U(url), {
            method,
            signal,
            body,
            headers,
        })

        return { ok: true, data: await response.json() }
    } catch (error) {
        return { ok: false, code: 400, message: 'Test Error' }
    }
}

export { REQUEST }

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
const REQUEST: TRequest = async (url, method, signal, json) => {
    try {
        method = method || 'GET'
        let body: null | BodyInit = null
        let headers: undefined | HeadersInit

        if (method === 'POST') {
            headers = GetCSRFToken()
            if (json) {
                body = JSON.stringify(json)
                headers = { ...headers, 'Content-Type': 'application/json' }
            }
        }

        const response = await fetch(U(url), {
            method,
            signal,
            body,
            headers,
        })

        const data = await response.json()

        if (response.ok) return { ok: true, data }

        return { ok: false, ...data }
    } catch (error) {
        if (error instanceof DOMException) {
            return { ok: false, code: error.code, message: error.message }
        }

        return { ok: false, code: 400, message: 'Test Error' }
    }
}

export { REQUEST }

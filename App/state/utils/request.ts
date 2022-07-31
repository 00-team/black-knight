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

interface RequestBase {
    url: string
    method?: 'POST' | 'GET'
    signal?: AbortSignal
}

interface RequestJson extends RequestBase {
    method: 'POST'
    body: Object
}

interface RequestFormData extends RequestBase {
    method: 'POST'
    body: FormData
}

type RequestProps = RequestJson | RequestFormData | RequestBase

type TRequest = (props: RequestProps) => Promise<Response>
const REQUEST: TRequest = async props => {
    try {
        const { url, method, signal } = props
        let init: RequestInit = { method, signal }

        if (props.method === 'POST') {
            init.headers = GetCSRFToken()

            if ('body' in props) {
                if (props.body instanceof FormData) {
                    init.body = props.body
                } else {
                    init.body = JSON.stringify(props.body)
                    init.headers = {
                        ...init.headers,
                        'Content-Type': 'application/json',
                    }
                }
            }
        }

        const response = await fetch(U(url), init)
        const data = await response.json()

        if (response.ok) return { ok: true, data }

        return { ok: false, ...data }
    } catch (error) {
        if (error instanceof DOMException) {
            return { ok: false, code: error.code, message: error.message }
        }

        console.log(error)

        return { ok: false, code: 400, message: 'Test Error' }
    }
}

export { REQUEST }

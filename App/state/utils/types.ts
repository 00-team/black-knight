import { AxiosRequestConfig } from 'axios'

interface SuccessResponse {
    ok: true
    message?: string
    [k: string]: any
}

interface ErrorResponse {
    ok: false
    error: {
        code: number
        message: string
        [k: string]: any
    }
    [k: string]: any
}

type Response = SuccessResponse | ErrorResponse
type Request = (
    config: AxiosRequestConfig<FormData | Object>
) => Promise<Response>

export type { Response, Request, ErrorResponse, SuccessResponse }

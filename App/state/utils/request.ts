import axios, { AxiosRequestConfig } from 'axios'

const U = (url: string) => (BASE_URL + url).replaceAll('//', '/')

interface ResError {
    message: string
    code: number
}

interface GetResponseOk {
    ok: true
    data: any
}

interface GetResponseError {
    ok: false
    error: ResError
}

type GetResponse = GetResponseOk | GetResponseError

const HandleError = (error: unknown): ResError => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            if (error.response.data.message) return error.response.data

            return {
                message: error.response.statusText,
                code: error.response.status,
            }
        }

        return {
            message: error.message,
            code: 520,
        }
    }

    return { message: 'An Unknown Error Happend!', code: 520 }
}

type TGET = (url: string, config?: AxiosRequestConfig) => Promise<GetResponse>
const GET: TGET = async (url, config) => {
    try {
        const { data } = await axios.get(U(url), config)
        return { ok: true, data }
    } catch (error) {
        return { ok: false, error: HandleError(error) }
    }
}

export { GET }

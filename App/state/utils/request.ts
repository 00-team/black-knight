import axios, { AxiosRequestConfig } from 'axios'

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
    if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.error
    ) {
        // ReactAlert.error(error.response.data.error)
        return error.response.data.error
    }

    return { message: 'An Unknown Error Happend!', code: 400 }
}

type TGET = (url: string, config?: AxiosRequestConfig) => Promise<GetResponse>
const GET: TGET = async (url, config) => {
    try {
        const response = await axios.get(BASE_URL + url, config)
        return { ok: true, data: response.data }
    } catch (error) {
        return { ok: false, error: HandleError(error) }
    }
}

export { GET }

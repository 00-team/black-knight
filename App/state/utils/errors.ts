import { AxiosError, CanceledError } from 'axios'

import type { ErrorResponse } from './types'

const isAxiosError = (error: unknown): error is AxiosError<any> => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as AxiosError).isAxiosError === true
    )
}

const HandleError = (error: unknown): ErrorResponse => {
    let canceled = false
    let response: ErrorResponse = {
        ok: false,
        error: {
            code: 400,
            message: `${error}`,
        },
    }

    if (isAxiosError(error)) {
        if (error.response) {
            response = { ...response, ...error.response.data }
        } else {
            response.error.message = error.message
        }

        if (error.code === 'ERR_CANCELED' || error instanceof CanceledError) {
            canceled = true
            response.error.code = 20
        }
    }

    if (!canceled) {
        console.log(error)
        ReactAlert.error(response.error.message)
    }

    return response
}

export { HandleError }

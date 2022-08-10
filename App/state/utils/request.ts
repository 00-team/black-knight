import axios from 'axios'
import { get as GetCookies } from 'js-cookie'

import { HandleError } from './errors'
import type { Request } from './types'

const GetCSRFToken = () => {
    const csrftoken = GetCookies('csrftoken')
    if (!csrftoken) {
        location.reload()
        throw Error('CSRF Token Required.')
    }
    return { 'X-CSRFToken': csrftoken }
}

const REQUEST: Request = async config => {
    try {
        config.baseURL = BASE_URL

        if (config.method === 'POST') {
            config.headers = { ...GetCSRFToken(), ...config.headers }
        }

        const response = await axios.request(config)
        const data = response.data

        if (data.message) ReactAlert.success(data.message)

        return { ok: true, data }
    } catch (error) {
        return HandleError(error)
    }
}

export { REQUEST }

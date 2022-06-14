import React, { FC, useEffect, useState } from 'react'

import { useSearchParams, useNavigate } from 'react-router-dom'

import { Login as AuthLogin } from 'state/api/auth'

interface TAuthData {
    username: string
    password: string
}

const Login: FC = () => {
    const [AuthData, setAuthData] = useState<TAuthData>({
        username: '',
        password: '',
    })

    // for stroing ?next=/admin/12/
    const [NextURL, setNextURL] = useState<string | null>(null)

    const navigate = useNavigate()
    const [SearchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        let n = SearchParams.get('next')
        // by defualt next is /admin/ and we dont want it like this.
        if (n !== BASE_URL) setNextURL(n)

        // delete only next=... from query params
        SearchParams.delete('next')
        setSearchParams(SearchParams)
    }, [])

    const Submit = async () => {
        if (await AuthLogin(AuthData)) navigate(GetNextURL(NextURL))
    }

    return (
        <div>
            <div>
                username:
                <input
                    type='text'
                    autoComplete='on'
                    name='username'
                    onChange={e =>
                        setAuthData({ ...AuthData, username: e.target.value })
                    }
                />
            </div>
            <div>
                password:
                <input
                    type='text'
                    autoComplete='on'
                    name='password'
                    onChange={e =>
                        setAuthData({ ...AuthData, password: e.target.value })
                    }
                />
            </div>
            <div>
                <button onClick={() => Submit()}>Submit</button>
            </div>
        </div>
    )
}

const GetNextURL = (next: string | null) => {
    if (!next) return '/'

    if (next.at(-1) != '/') next = next + '/'
    if (next.startsWith(BASE_URL)) next = next.slice(BASE_URL.length)

    if (next.at(0) != '/') return '/' + next

    return next
}

export default Login

import React, { FC, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

interface LoginProps {}

const Login: FC<LoginProps> = () => {
    const [NextURL, setNextURL] = useState<string | null>(null)
    const [SearchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setNextURL(SearchParams.get('next'))
        setSearchParams('')
    }, [])

    console.log(NextURL)

    return <div>Login</div>
}

export default Login

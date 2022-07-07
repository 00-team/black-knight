import React, { FC, useRef, useState } from 'react'

import { C } from '@00-team/utils'

// style
import './style/searchinput.scss'

interface SearchInputProps {
    submit: (search_text: string) => void
}

const SearchInput: FC<SearchInputProps> = ({ submit }) => {
    const [active, setActive] = useState(false)
    const input = useRef<HTMLInputElement>(null)

    return (
        <div className={'search-wrapper title_small' + C(active)}>
            <div className='input-holder'>
                <input
                    ref={input}
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                />
                <button
                    className='search-icon'
                    onClick={() => {
                        if (active && input.current && input.current.value)
                            submit(input.current.value)
                        else setActive(true)
                    }}
                >
                    <span></span>
                </button>
            </div>
            <span
                className='close'
                onClick={() => {
                    if (input.current) input.current.value = ''
                    setActive(false)
                }}
            ></span>
        </div>
    )
}

export default SearchInput

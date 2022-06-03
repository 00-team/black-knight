import React, { useState } from 'react'

// style
import './style/searchinput.scss'

const SearchInput = () => {
    const [InputActive, setInputActive] = useState(false)
    return (
        <div
            className={`search-wrapper title_small ${
                InputActive ? 'active' : ''
            }`}
        >
            <div className='input-holder'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                />
                <button
                    className='search-icon'
                    onClick={() => setInputActive(true)}
                >
                    <span></span>
                </button>
            </div>
            <span
                className='close'
                onClick={() => setInputActive(false)}
            ></span>
        </div>
    )
}

export default SearchInput

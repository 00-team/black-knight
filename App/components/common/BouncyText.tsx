import React, { FC } from 'react'

import './style/bouncy-text.scss'

const BouncyText: FC<{ text: string }> = ({ text }) => {
    let delay = -0.5
    return (
        <span className='bouncy-text'>
            {text.split('').map((w, idx) => {
                if (w === ' ') return <span key={idx} className='space' />
                delay += 0.5
                return (
                    <span
                        className='char'
                        key={idx}
                        style={{ animationDelay: `${delay}s` }}
                    >
                        {w}
                    </span>
                )
            })}
        </span>
    )
}

export { BouncyText }

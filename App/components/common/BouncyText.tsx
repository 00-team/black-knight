import React, { FC } from 'react'

import './style/bouncy-text.scss'

interface BouncyTextProps {
    text: string
    className?: string
}

const BouncyText: FC<BouncyTextProps> = ({ text, className }) => {
    let delay = -0.5
    return (
        <div className={'bouncy-text ' + (className || '')}>
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
        </div>
    )
}

export default BouncyText

import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import './style/isintersectingform.scss'

interface IsIntersectingFormProps {
    children: any
}

const IsIntersectingForm: FC<IsIntersectingFormProps> = ({ children }) => {
    const ContentContainer = useRef<HTMLDivElement>(null)
    // content container
    const [CC, setCC] = useState(false)
    useEffect(() => {
        if (ContentContainer.current && !CC) {
            var observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry && entry.isIntersecting) {
                        setCC(true)
                        observer.disconnect()
                    }
                },
                {
                    rootMargin: '-200px',
                }
            )

            observer.observe(ContentContainer.current)
        }
        return () => {
            if (observer) observer.disconnect()
        }
    }, [ContentContainer])
    return (
        <span
            ref={ContentContainer}
            className={'isintersecting-container' + C(CC)}
        >
            {children}
        </span>
    )
}

export default IsIntersectingForm

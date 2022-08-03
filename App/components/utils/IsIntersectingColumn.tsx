import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import './style/IsIntersectingcolumn.scss'

interface IsIntersectingColumnProps {
    children: any
}

const IsIntersectingColumn: FC<IsIntersectingColumnProps> = ({ children }) => {
    const ColumnContainer = useRef<HTMLDivElement>(null)
    // column container
    const [CC, setCC] = useState(false)
    useEffect(() => {
        if (ColumnContainer.current && !CC) {
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

            observer.observe(ColumnContainer.current)
        }
        return () => {
            if (observer) observer.disconnect()
        }
    }, [ColumnContainer])
    return (
        <div ref={ColumnContainer} className={`column-container ${C(CC)}`}>
            {children}
        </div>
    )
}

export { IsIntersectingColumn }

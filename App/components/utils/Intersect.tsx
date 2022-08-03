import React, {
    FC,
    HTMLAttributes,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'

import { C } from '@00-team/utils'

// type attrs = Omit<HTMLAttributes<HTMLDivElement>, 'children'>
interface IntersectProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    options?: IntersectionObserverInit
}

const Intersect: FC<IntersectProps> = ({ children, options, ...attrs }) => {
    const container = useRef<HTMLDivElement>(null)
    const [Intersected, setIntersected] = useState(false)

    useEffect(() => {
        if (container.current && !Intersected) {
            var observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    setIntersected(true)
                    observer.disconnect()
                }
            }, options)

            observer.observe(container.current)
        }
        return () => {
            if (observer) observer.disconnect()
        }
    }, [container])

    return (
        <div
            ref={container}
            {...attrs}
            className={'intersect ' + C(Intersected) + attrs.className || ''}
        >
            {children}
        </div>
    )
}

export { Intersect }

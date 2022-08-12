import React, { FC, useEffect, useRef } from 'react'

interface RawHtmlProps {
    html: string
}

const RawHtml: FC<RawHtmlProps> = ({ html }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        // make a js fragment element
        const fragment = document.createDocumentFragment()

        // move every child from our div to new fragment
        while (ref.current.childNodes[0]) {
            fragment.appendChild(ref.current.childNodes[0])
        }

        // and after all replace the div with fragment
        ref.current.replaceWith(fragment)
    }, [ref])

    return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }}></div>
}

export { RawHtml }

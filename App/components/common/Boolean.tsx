import React, { FC } from 'react'

interface BooleanProps {
    value: unknown | boolean
}

const Boolean: FC<BooleanProps> = ({ value }) => {
    // TODO: use a svg or an image for rendering the booleans

    if (!!value) return <>True 💚</>
    return <>False ❤</>
}

export { Boolean }

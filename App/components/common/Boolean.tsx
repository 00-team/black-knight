import React, { FC } from 'react'

const Boolean: FC<{ v: unknown }> = ({ v }) => {
    // TODO: use a svg or an image for rendering the booleans
    const bool = !!v
    if (bool) return <>True 💚</>
    return <>False ❤</>
}

export { Boolean }

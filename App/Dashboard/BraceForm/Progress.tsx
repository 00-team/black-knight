import React, { FC } from 'react'

import { useAtomValue } from 'jotai'
import { SubmitProgressAtom } from 'state'

interface ProgressProps {}

const Progress: FC<ProgressProps> = () => {
    const progress = useAtomValue(SubmitProgressAtom)
    if (progress === null || progress.done) return <></>

    return <div>{progress.percentage} % </div>
}

export default Progress

import React, {
    FC,
    HTMLAttributes,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'

// import { C } from '@00-team/utils'
import confetti from 'canvas-confetti'

// import { BFSData, BraceFormAtom, SubmitBraceForm } from 'state'

interface IntersectProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children: (i: boolean) => ReactNode
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
            className={'GGEZ ' + attrs.className || ''}
        >
            {children(Intersected)}
        </div>
    )
}

const Footer: FC = () => {
    const Submit = () => {
        // SubmitBraceForm(SubmitData)
        ShowParticles()
    }

    return (
        <div
        // className={'form-footer title_small' + C(iibc)}
        // ref={BtnsContainer}
        >
            <Intersect>
                {i => {
                    console.log(i)
                    return <div>GG {i ? '1' : '0'}</div>
                }}
            </Intersect>
            <button style={{ animationDelay: '0.5s' }} onClick={() => Submit()}>
                Save and add another
            </button>
            <button style={{ animationDelay: '1.5s' }} onClick={() => Submit()}>
                Save and continue editing
            </button>
            <button
                style={{ animationDelay: '1s' }}
                className='main'
                id='save-btn'
                onClick={() => Submit()}
            >
                Save
            </button>
        </div>
    )
}

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
}

const ShowParticles = () => {
    let duration = 7 * 1000
    let animationEnd = Date.now() + duration
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    let interval: any = setInterval(function () {
        let timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            return clearInterval(interval)
        }

        var particleCount = 50 * (timeLeft / duration)
        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: randomInRange(0.1, 0.3),
                    y: Math.random() - 0.2,
                },
            })
        )
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: {
                    x: randomInRange(0.7, 0.9),
                    y: Math.random() - 0.2,
                },
            })
        )
    }, 250)
}

export { Footer }

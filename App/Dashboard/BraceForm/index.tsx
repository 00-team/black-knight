import React, { FC, useEffect, useRef, useState } from 'react'

import { C } from '@00-team/utils'

import { FaNewspaper } from '@react-icons/all-files/fa/FaNewspaper'

import confetti from 'canvas-confetti'

import './style/braceform.scss'

// debug
const modelName = 'Blog'

const BraceForm: FC = () => {
    const BtnsContainer = useRef<HTMLDivElement>(null)

    var duration = 7 * 1000
    var animationEnd = Date.now() + duration
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    const HandleClick = () => {
        var interval: any = setInterval(function () {
            var timeLeft = animationEnd - Date.now()

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

    // is intersecting btns container
    const [iibc, setiibc] = useState(false)
    useEffect(() => {
        if (BtnsContainer.current && !iibc) {
            var observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry && entry.isIntersecting) {
                        setiibc(true)
                        observer.disconnect()
                    }
                },
                {
                    rootMargin: '-75px',
                }
            )

            observer.observe(BtnsContainer.current)
        }
        return () => {
            if (observer) observer.disconnect()
        }
    }, [BtnsContainer])
    return (
        <div className='brace_form-container'>
            <div className='form-title title'>
                <span>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                    <div className='holder'>Add {modelName}</div>
                    <div className='icon'>
                        <FaNewspaper size={30} />
                    </div>
                </span>
            </div>
            <div className='form-data'></div>
            <div
                className={'form-footer title_small' + C(iibc, 'active')}
                ref={BtnsContainer}
            >
                <button style={{ animationDelay: '0.5s' }}>
                    Save and add another
                </button>
                <button style={{ animationDelay: '1.5s' }}>
                    Save and continue editing
                </button>
                <button
                    style={{ animationDelay: '1s' }}
                    className='main'
                    id='save-btn'
                    onClick={() => HandleClick()}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default BraceForm

import confetti from 'canvas-confetti'

function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
}

const PARTICLES_DEFAULTS = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
}
var PLAYING_PARTICLES = false

const ShowParticles = () => {
    // spam prof
    if (PLAYING_PARTICLES) return
    PLAYING_PARTICLES = true

    const duration = randomInRange(1000, 7000)
    const animationEnd = Date.now() + duration

    let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
            clearInterval(interval)
            PLAYING_PARTICLES = false
            return
        }

        var particleCount = 50 * (timeLeft / duration)
        // since particles fall down, start a bit higher than random
        confetti({
            ...PARTICLES_DEFAULTS,
            particleCount,
            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2,
            },
        })
        confetti({
            ...PARTICLES_DEFAULTS,
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2,
            },
        })
    }, 250)
}

export { ShowParticles }

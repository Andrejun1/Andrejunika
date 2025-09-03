import { useEffect, useRef } from 'react'

/**
 * NeonCanvas renders an animated neon particles/lines effect inside its own canvas.
 * Each instance is independent so multiple canvases can coexist (e.g., one per navbar item).
 */
export default function NeonCanvas({
  className = '',
  colors = ['#ff2bb3', '#7a2ff7', '#29ffe3'],
  density = 0.6, // particles per 1% of min(width,height)
  speed = 0.3, // movement pixels per frame
  opacity = 0.5,
  rounded = 10,
  animate = true,
  showLines = true,
  fill = true,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const particles = []

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      // Ensure CSS size matches layout box (prevents visual mismatch)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      // Resize backing store for HiDPI and reset transform
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // re-seed particles
      particles.length = 0
      const minSide = Math.min(width, height)
      const count = Math.max(4, Math.floor(minSide * density * 0.1))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: 1.2 + Math.random() * 2.2,
          c: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    function drawRoundedRect(x, y, w, h, r) {
      const rr = Math.min(r, w / 2, h / 2)
      ctx.beginPath()
      ctx.moveTo(x + rr, y)
      ctx.arcTo(x + w, y, x + w, y + h, rr)
      ctx.arcTo(x + w, y + h, x, y + h, rr)
      ctx.arcTo(x, y + h, x, y, rr)
      ctx.arcTo(x, y, x + w, y, rr)
      ctx.closePath()
    }

    function render() {
      // Clear in device pixels, then draw in CSS pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // optional subtle glow background
      if (fill) {
        const grad = ctx.createLinearGradient(0, 0, width, height)
        grad.addColorStop(0, 'rgba(255,43,179,0.10)')
        grad.addColorStop(1, 'rgba(41,255,227,0.08)')
        ctx.fillStyle = grad
        drawRoundedRect(0, 0, width, height, rounded)
        ctx.fill()
      }

      // draw moving particles and trailing lines
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        glow.addColorStop(0, `${p.c}${Math.floor(255 * opacity).toString(16).padStart(2, '0')}`)
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = p.c
        ctx.globalAlpha = 0.9
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // connecting lines
      if (showLines) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]
            const b = particles[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < Math.min(width, height) * 0.35) {
              const alpha = Math.max(0, 1 - dist / (Math.min(width, height) * 0.35)) * 0.4 * opacity
              ctx.strokeStyle = a.c
              ctx.globalAlpha = alpha
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
              ctx.globalAlpha = 1
            }
          }
        }
      }

      if (animate) rafRef.current = requestAnimationFrame(render)
    }

    const ro = new ResizeObserver(resize)
    const io = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0]?.isIntersecting ?? true
      if (isVisibleRef.current) {
        // resume
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(render)
      }
    }, { root: null, threshold: 0 })
    io.observe(canvas)
    ro.observe(canvas)
    resize()
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
    }
  }, [colors, density, speed, opacity, rounded, animate])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}







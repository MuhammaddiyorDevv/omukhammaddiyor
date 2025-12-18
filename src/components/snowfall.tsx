import { useEffect, useMemo, useRef } from "react"

type SnowfallProps = {
  /** 0..1 */
  intensity?: number
  /** Lower this if you want less CPU/GPU usage */
  maxFlakes?: number
  /** Enable/disable */
  enabled?: boolean
}

type Flake = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  wobble: number
  wobbleSpeed: number
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

export function Snowfall({
  intensity = 0.55,
  maxFlakes = 140,
  enabled = true,
}: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const flakesRef = useRef<Flake[]>([])

  const shouldRun = useMemo(() => enabled, [enabled])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (!shouldRun) return
    if (prefersReducedMotion()) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const desired = Math.max(25, Math.min(maxFlakes, Math.floor(maxFlakes * intensity)))

    const makeFlake = (w: number, h: number): Flake => {
      const r = 1 + Math.random() * 2.6
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r,
        vx: (-0.3 + Math.random() * 0.6) * (0.6 + r / 4),
        vy: (0.7 + Math.random() * 1.6) * (0.7 + r / 4),
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.02,
      }
    }

    const init = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      flakesRef.current = Array.from({ length: desired }, () => makeFlake(w, h))
    }

    init()

    const onResize = () => {
      resize()
      init()
    }

    window.addEventListener("resize", onResize)

    const tick = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      // Theme-aware color: a bit brighter in dark mode
      const isDark = document.documentElement.classList.contains("dark")
      const alpha = isDark ? 0.55 : 0.42

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`

      for (const f of flakesRef.current) {
        f.wobble += f.wobbleSpeed
        f.x += f.vx + Math.sin(f.wobble) * 0.25
        f.y += f.vy

        if (f.y - f.r > h) {
          f.y = -f.r - Math.random() * 20
          f.x = Math.random() * w
        }
        if (f.x < -10) f.x = w + 10
        if (f.x > w + 10) f.x = -10

        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("resize", onResize)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [enabled, intensity, maxFlakes, shouldRun])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}



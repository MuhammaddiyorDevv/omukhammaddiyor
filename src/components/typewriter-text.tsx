import { useEffect, useMemo, useState } from "react"

type TypewriterTextProps = {
  text: string
  className?: string
  typingMs?: number
  deletingMs?: number
  pauseAfterTypedMs?: number
  pauseAfterDeletedMs?: number
  cursor?: boolean
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    if (!media) return
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener?.("change", update)
    return () => media.removeEventListener?.("change", update)
  }, [])

  return reduced
}

export function TypewriterText({
  text,
  className,
  typingMs = 60,
  deletingMs = 28,
  pauseAfterTypedMs = 1200,
  pauseAfterDeletedMs = 400,
  cursor = true,
}: TypewriterTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState("")
  const [phase, setPhase] = useState<"typing" | "pausingTyped" | "deleting" | "pausingDeleted">(
    "typing"
  )

  // Reset cleanly when language changes / text updates
  useEffect(() => {
    setValue("")
    setPhase("typing")
  }, [text])

  const safeText = useMemo(() => text ?? "", [text])

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(safeText)
      return
    }

    let t: number | undefined

    if (phase === "typing") {
      if (value.length < safeText.length) {
        t = window.setTimeout(() => {
          setValue(safeText.slice(0, value.length + 1))
        }, typingMs)
      } else {
        t = window.setTimeout(() => setPhase("pausingTyped"), pauseAfterTypedMs)
      }
    }

    if (phase === "pausingTyped") {
      t = window.setTimeout(() => setPhase("deleting"), 0)
    }

    if (phase === "deleting") {
      if (value.length > 0) {
        t = window.setTimeout(() => {
          setValue(safeText.slice(0, Math.max(0, value.length - 1)))
        }, deletingMs)
      } else {
        t = window.setTimeout(() => setPhase("pausingDeleted"), pauseAfterDeletedMs)
      }
    }

    if (phase === "pausingDeleted") {
      t = window.setTimeout(() => setPhase("typing"), 0)
    }

    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [
    value,
    phase,
    safeText,
    typingMs,
    deletingMs,
    pauseAfterTypedMs,
    pauseAfterDeletedMs,
    prefersReducedMotion,
  ])

  return (
    <span className={"relative inline-block " + (className ?? "")} aria-label={safeText}>
      <span className="sr-only">{safeText}</span>

      {/* Reserve the final wrapped height to avoid layout shift while typing/deleting */}
      <span aria-hidden="true" className="invisible block">
        {safeText}
        {cursor ? <span className="ml-0.5 inline-block w-[0.6ch]">|</span> : null}
      </span>

      {/* Render the animated text on top */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        {value}
        {cursor ? (
          <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse text-muted-foreground">
            |
          </span>
        ) : null}
      </span>
    </span>
  )
}



'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
  skipOnClick?: boolean
}

export function TypewriterText({
  text,
  speed = 35,
  onComplete,
  className = '',
  skipOnClick = true,
}: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setDone(false)

    const tick = () => {
      if (indexRef.current >= text.length) {
        setDone(true)
        onComplete?.()
        return
      }
      indexRef.current++
      setDisplayed(text.slice(0, indexRef.current))
      timerRef.current = setTimeout(tick, speed)
    }

    timerRef.current = setTimeout(tick, speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [text, speed, onComplete])

  const skip = () => {
    if (!skipOnClick || done) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setDisplayed(text)
    setDone(true)
    onComplete?.()
  }

  return (
    <span
      className={className}
      onClick={skip}
      style={{ cursor: done ? 'default' : 'pointer' }}
    >
      {displayed}
      {!done && (
        <span className="ml-px inline-block w-[2px] animate-pulse bg-parchment-dim">
          &nbsp;
        </span>
      )}
    </span>
  )
}

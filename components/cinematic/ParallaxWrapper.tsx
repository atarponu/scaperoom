'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export function ParallaxWrapper({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      const px = ((e.clientX / window.innerWidth) - 0.5) * 2
      const py = ((e.clientY / window.innerHeight) - 0.5) * 2
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
    }

    // iPad device orientation
    const onOrientation = (e: DeviceOrientationEvent) => {
      const px = Math.max(-1, Math.min(1, (e.gamma ?? 0) / 20))
      const py = Math.max(-1, Math.min(1, (e.beta ?? 0) / 20 - 1))
      el.style.setProperty('--px', px.toFixed(3))
      el.style.setProperty('--py', py.toFixed(3))
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('deviceorientation', onOrientation, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('deviceorientation', onOrientation)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`absolute inset-0 ${className}`}
      style={{ '--px': '0', '--py': '0' } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

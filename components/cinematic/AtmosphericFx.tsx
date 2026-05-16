'use client'

import { useMemo } from 'react'
import type { TensionLevel } from '@/types/narrative'

interface RainDrop {
  x: number
  delay: number
  duration: number
  opacity: number
  width: number
}

function RainLayer({ count = 80 }: { count?: number }) {
  const drops = useMemo<RainDrop[]>(() => (
    Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.6 + Math.random() * 0.5,
      opacity: 0.04 + Math.random() * 0.08,
      width: 0.8 + Math.random() * 0.8,
    }))
  ), [count])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {drops.map((d, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `${d.x}%`,
            width: `${d.width}px`,
            height: '120px',
            background: `linear-gradient(to bottom, transparent, rgba(196,168,130,${d.opacity}), transparent)`,
            animation: `rain-fall ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes rain-fall {
          0% { transform: translateY(-120px); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  )
}

function FogLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(20,22,28,0.12) 0%, transparent 40%, transparent 60%, rgba(20,22,28,0.12) 100%)',
          animation: 'fog-drift-a 28s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: 'linear-gradient(to top, rgba(15,18,22,0.25), transparent)',
          animation: 'fog-drift-b 18s ease-in-out infinite alternate',
        }}
      />
      <style>{`
        @keyframes fog-drift-a {
          0%{transform:translateX(0)} 100%{transform:translateX(-60px)}
        }
        @keyframes fog-drift-b {
          0%{transform:translateX(0) scaleX(1)} 100%{transform:translateX(40px) scaleX(1.08)}
        }
      `}</style>
    </div>
  )
}

interface Props {
  tension: TensionLevel
  backgroundType: string
}

export function AtmosphericFx({ tension, backgroundType }: Props) {
  const showRain =
    backgroundType === 'street-occupied' ||
    backgroundType === 'night-street' ||
    backgroundType === 'night-canal' ||
    backgroundType === 'checkpoint'

  const showFog =
    backgroundType !== 'black' &&
    backgroundType !== 'museum' &&
    backgroundType !== 'bookshop'

  const rainCount =
    tension === 'critical' ? 120 :
    tension === 'high' ? 90 :
    tension === 'medium' ? 60 : 40

  return (
    <>
      {showRain && <RainLayer count={rainCount} />}
      {showFog && <FogLayer />}
    </>
  )
}

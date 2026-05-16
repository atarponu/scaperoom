'use client'

import { useEffect, useRef, useMemo } from 'react'
import type { BackgroundType, TensionLevel } from '@/types/narrative'

/* ─── Types ─────────────────────────────────────────────────────── */
type ParticleKind = 'dust' | 'ash' | 'fog' | 'ember' | 'smoke'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  opacityTarget: number
  life: number
  maxLife: number
  kind: ParticleKind
  angle: number       // for wobble
  wobbleSpeed: number
  wobbleAmp: number
}

interface Config {
  count: number
  kinds: ParticleKind[]
  windX: number
  windY: number
  gravity: number
  spawnRegion: 'full' | 'upper' | 'lamp' | 'center'
}

/* ─── Per-scene config ──────────────────────────────────────────── */
function sceneConfig(bg: BackgroundType, tension: TensionLevel): Config {
  const tensionMult = tension === 'critical' ? 1.6 : tension === 'high' ? 1.3 : tension === 'medium' ? 1.1 : 1

  switch (bg) {
    case 'apartment-attic':
      return { count: Math.floor(40 * tensionMult), kinds: ['dust'], windX: 0.018, windY: -0.07, gravity: -0.001, spawnRegion: 'lamp' }
    case 'apartment-hallway':
      return { count: 18, kinds: ['dust'], windX: 0.01, windY: -0.04, gravity: -0.001, spawnRegion: 'upper' }
    case 'bookshop':
      return { count: 28, kinds: ['dust', 'smoke'], windX: 0.012, windY: -0.05, gravity: -0.001, spawnRegion: 'lamp' }
    case 'safe-house':
      return { count: 22, kinds: ['dust', 'smoke'], windX: 0.008, windY: -0.06, gravity: -0.002, spawnRegion: 'center' }
    case 'ruins':
      return { count: Math.floor(35 * tensionMult), kinds: ['ash', 'dust'], windX: 0.06, windY: -0.1, gravity: 0.008, spawnRegion: 'full' }
    case 'checkpoint':
      return { count: Math.floor(20 * tensionMult), kinds: ['dust', 'fog'], windX: 0.04, windY: -0.06, gravity: 0, spawnRegion: 'full' }
    case 'street-occupied':
      return { count: 20, kinds: ['fog', 'dust'], windX: 0.05, windY: -0.04, gravity: 0, spawnRegion: 'full' }
    case 'night-street':
    case 'night-canal':
      return { count: 14, kinds: ['fog'], windX: 0.025, windY: -0.025, gravity: 0, spawnRegion: 'full' }
    case 'museum':
      return { count: 10, kinds: ['dust'], windX: 0.004, windY: -0.018, gravity: 0, spawnRegion: 'upper' }
    default:
      return { count: 6, kinds: ['dust'], windX: 0.006, windY: -0.015, gravity: 0, spawnRegion: 'full' }
  }
}

/* ─── Particle factory ──────────────────────────────────────────── */
function makeParticle(cfg: Config, w: number, h: number, randomLife = false): Particle {
  const kind = cfg.kinds[Math.floor(Math.random() * cfg.kinds.length)]

  let x: number, y: number
  switch (cfg.spawnRegion) {
    case 'lamp':
      x = w * 0.35 + Math.random() * w * 0.4
      y = h * 0.15 + Math.random() * h * 0.6
      break
    case 'upper':
      x = Math.random() * w
      y = Math.random() * h * 0.55
      break
    case 'center':
      x = w * 0.2 + Math.random() * w * 0.6
      y = h * 0.2 + Math.random() * h * 0.6
      break
    default:
      x = Math.random() * w
      y = Math.random() * h
  }

  const isFog = kind === 'fog'
  const isSmoke = kind === 'smoke'
  const size = isFog
    ? 50 + Math.random() * 90
    : isSmoke
    ? 8 + Math.random() * 16
    : kind === 'ember'
    ? 2 + Math.random() * 2.5
    : 0.8 + Math.random() * 1.6

  const maxLife = isFog
    ? 400 + Math.random() * 300
    : isSmoke
    ? 200 + Math.random() * 160
    : 160 + Math.random() * 180

  const life = randomLife ? Math.random() * maxLife : 0

  return {
    x, y,
    vx: (Math.random() - 0.5) * (isFog ? 0.25 : 0.12),
    vy: -(Math.random() * (isFog ? 0.06 : 0.08) + 0.01),
    size,
    opacity: 0,
    opacityTarget: isFog
      ? 0.025 + Math.random() * 0.05
      : isSmoke
      ? 0.04 + Math.random() * 0.06
      : kind === 'ember'
      ? 0.6 + Math.random() * 0.4
      : 0.08 + Math.random() * 0.28,
    life,
    maxLife,
    kind,
    angle: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.008 + Math.random() * 0.015,
    wobbleAmp: 0.2 + Math.random() * 0.5,
  }
}

/* ─── Draw helpers ──────────────────────────────────────────────── */
function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  const a = p.opacity
  if (a <= 0.001) return

  switch (p.kind) {
    case 'fog': {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      g.addColorStop(0, `rgba(50,60,70,${a})`)
      g.addColorStop(1, `rgba(50,60,70,0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'smoke': {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
      g.addColorStop(0, `rgba(180,160,130,${a})`)
      g.addColorStop(1, `rgba(180,160,130,0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'ember': {
      // Bright core
      ctx.fillStyle = `rgba(240,120,20,${a})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      // Glow halo
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5)
      g.addColorStop(0, `rgba(220,80,10,${a * 0.4})`)
      g.addColorStop(1, `rgba(220,80,10,0)`)
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
      ctx.fill()
      break
    }
    case 'ash': {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      ctx.fillStyle = `rgba(130,130,120,${a})`
      ctx.fillRect(-p.size, -p.size * 0.4, p.size * 2, p.size * 0.8)
      ctx.restore()
      break
    }
    default: {
      // dust — tiny dot
      ctx.fillStyle = `rgba(196,168,130,${a})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      break
    }
  }
}

/* ─── Component ─────────────────────────────────────────────────── */
interface Props {
  backgroundType: BackgroundType
  tension?: TensionLevel
}

export function ParticleSystem({ backgroundType, tension = 'low' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cfg = useMemo(() => sceneConfig(backgroundType, tension), [backgroundType, tension])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = canvas.offsetHeight || window.innerHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Seed particles at random life phase so they don't all spawn at once
    let particles: Particle[] = Array.from({ length: cfg.count }, () =>
      makeParticle(cfg, canvas.width, canvas.height, true)
    )

    let rafId: number

    const tick = () => {
      if (!canvas.isConnected) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life++

        // Lifecycle opacity
        const ratio = p.life / p.maxLife
        if (ratio < 0.12) {
          p.opacity = p.opacityTarget * (ratio / 0.12)
        } else if (ratio > 0.78) {
          p.opacity = p.opacityTarget * (1 - (ratio - 0.78) / 0.22)
        } else {
          p.opacity = p.opacityTarget
        }

        // Wobble
        p.angle += p.wobbleSpeed
        p.vx += Math.sin(p.angle) * p.wobbleAmp * 0.002
        p.vy += Math.cos(p.angle * 0.7) * p.wobbleAmp * 0.001

        // Wind & gravity
        p.vx += cfg.windX * (0.8 + Math.random() * 0.4) * 0.04
        p.vy += cfg.windY * (0.8 + Math.random() * 0.4) * 0.04 + cfg.gravity

        // Drag
        p.vx *= 0.992
        p.vy *= 0.992

        p.x += p.vx
        p.y += p.vy

        if (p.life >= p.maxLife) {
          particles[i] = makeParticle(cfg, canvas.width, canvas.height, false)
          continue
        }

        drawParticle(ctx, p)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [cfg])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

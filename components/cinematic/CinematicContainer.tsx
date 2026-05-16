'use client'

import { FilmGrain } from './FilmGrain'
import { VignetteLayer } from './VignetteLayer'
import { LetterboxBars } from './LetterboxBars'
import type { TensionLevel } from '@/types/narrative'

interface Props {
  children: React.ReactNode
  tension?: TensionLevel
  showLetterbox?: boolean
}

export function CinematicContainer({
  children,
  tension = 'low',
  showLetterbox = true,
}: Props) {
  const vignetteIntensity =
    tension === 'critical' || tension === 'high'
      ? 'heavy'
      : tension === 'medium'
      ? 'medium'
      : 'light'

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-ink font-narrative text-parchment animate-flicker">
      {children}
      <VignetteLayer intensity={vignetteIntensity} />
      <FilmGrain />
      {showLetterbox && <LetterboxBars />}
    </div>
  )
}

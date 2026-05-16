'use client'

import { FilmGrain } from './FilmGrain'
import { VignetteLayer } from './VignetteLayer'
import { LetterboxBars } from './LetterboxBars'
import { ParallaxWrapper } from './ParallaxWrapper'
import { AtmosphericFx } from './AtmosphericFx'
import type { TensionLevel, BackgroundType } from '@/types/narrative'

interface Props {
  children: React.ReactNode
  tension?: TensionLevel
  backgroundType?: BackgroundType
  showLetterbox?: boolean
}

export function CinematicContainer({
  children,
  tension = 'low',
  backgroundType = 'black',
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
      <ParallaxWrapper>
        {children}
        <AtmosphericFx tension={tension} backgroundType={backgroundType} />
      </ParallaxWrapper>
      <VignetteLayer intensity={vignetteIntensity} />
      <FilmGrain />
      {showLetterbox && <LetterboxBars />}
    </div>
  )
}

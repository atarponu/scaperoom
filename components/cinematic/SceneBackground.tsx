'use client'

import type { BackgroundType } from '@/types/narrative'

const BG_STYLES: Record<BackgroundType, string> = {
  black: 'bg-ink',
  'apartment-hallway':
    'bg-gradient-to-b from-[#1a1208] via-[#201608] to-[#0f0c06]',
  'apartment-attic':
    'bg-gradient-to-b from-[#0f0c07] via-[#181310] to-[#0a0805]',
  'street-occupied':
    'bg-gradient-to-b from-[#141820] via-[#0e131a] to-[#090c10]',
  checkpoint:
    'bg-gradient-to-b from-[#0a0c10] via-[#101318] to-[#080a0c]',
  bookshop:
    'bg-gradient-to-b from-[#1a1408] via-[#18130a] to-[#100d07]',
  'night-street':
    'bg-gradient-to-b from-[#050810] via-[#060912] to-[#030508]',
  'night-canal':
    'bg-gradient-to-b from-[#06090e] via-[#080c14] to-[#040608]',
  'safe-house':
    'bg-gradient-to-b from-[#10100c] via-[#141410] to-[#0c0c08]',
  ruins:
    'bg-gradient-to-b from-[#100c0a] via-[#0e0a08] to-[#080604]',
  museum:
    'bg-gradient-to-b from-[#141210] via-[#121008] to-[#0e0c08]',
}

const BG_OVERLAYS: Partial<Record<BackgroundType, React.ReactNode>> = {
  'apartment-hallway': (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute left-[15%] top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-parchment-dim/30 to-transparent" />
      <div className="absolute left-[35%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-parchment-dim/15 to-transparent" />
    </div>
  ),
  checkpoint: (
    <div className="absolute inset-0">
      <div className="absolute left-1/4 top-[20%] h-[60%] w-[120px] -translate-x-1/2 bg-gradient-to-b from-[#c4a882]/8 to-transparent blur-xl" />
    </div>
  ),
  bookshop: (
    <div className="absolute inset-0 opacity-30">
      <div className="absolute left-[10%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#c4a882]/20 to-transparent" />
      <div className="absolute left-[30%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#c4a882]/15 to-transparent" />
      <div className="absolute left-[50%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#c4a882]/20 to-transparent" />
      <div className="absolute left-[70%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#c4a882]/15 to-transparent" />
    </div>
  ),
  'night-street': (
    <div className="absolute inset-0">
      <div className="absolute left-1/3 top-0 h-1/3 w-[60px] -translate-x-1/2 bg-gradient-to-b from-[#c4a882]/6 to-transparent blur-2xl" />
      <div className="absolute right-1/4 top-0 h-1/2 w-[80px] translate-x-1/2 bg-gradient-to-b from-[#c4a882]/4 to-transparent blur-2xl" />
    </div>
  ),
  museum: (
    <div className="absolute inset-0 opacity-40">
      <div className="absolute left-0 right-0 top-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#c4a882]/20 to-transparent" />
      <div className="absolute bottom-[15%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c4a882]/15 to-transparent" />
    </div>
  ),
}

interface Props {
  type: BackgroundType
  animate?: boolean
}

export function SceneBackground({ type, animate = true }: Props) {
  return (
    <div
      className={`absolute inset-0 ${BG_STYLES[type]} ${animate ? 'animate-breathe' : ''} overflow-hidden`}
    >
      {BG_OVERLAYS[type]}
    </div>
  )
}

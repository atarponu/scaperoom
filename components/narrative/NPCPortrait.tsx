'use client'

import { motion } from 'framer-motion'
import type { NPCDefinition } from '@/types/npc'

interface Props {
  npc: NPCDefinition
  trust?: number
  visible?: boolean
}

export function NPCPortrait({ npc, trust = 0, visible = true }: Props) {
  const opacity = trust < -0.5 ? 0.6 : 1

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: visible ? opacity : 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-36 w-28 overflow-hidden md:h-44 md:w-36"
    >
      {/* Portrait frame */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${npc.portraitGradient} opacity-90`}
      />

      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

      {/* Silhouette shape — CSS art */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Head */}
          <div className="mx-auto h-10 w-8 rounded-full bg-parchment-dim/20 blur-[1px]" />
          {/* Shoulders */}
          <div className="mx-auto mt-1 h-16 w-20 rounded-t-full bg-parchment-dim/10 blur-[2px]" />
        </div>
      </div>

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-2 pb-2 pt-4">
        <p className="font-title text-[10px] uppercase tracking-[0.2em] text-parchment-dim/80">
          {npc.name}
        </p>
      </div>

      {/* Border */}
      <div className="absolute inset-0 border border-parchment-dim/10" />
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playSfx } from '@/lib/audio/sfx'
import type { Choice, GameFlags } from '@/types/narrative'

interface Props {
  choices: Choice[]
  flags: GameFlags
  onChoice: (choice: Choice) => void
  visible?: boolean
}

export function ChoicePanel({ choices, flags, onChoice, visible = true }: Props) {
  const [chosen, setChosen] = useState<string | null>(null)

  const availableChoices = choices.filter((c) => {
    if (c.requiresFlag === undefined) return true
    const val = flags[c.requiresFlag]
    return val === (c.requiresFlagValue ?? true)
  })

  const handleChoice = (choice: Choice) => {
    if (chosen) return
    setChosen(choice.id)
    playSfx('choice-select')
    setTimeout(() => onChoice(choice), 700)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-3"
        >
          {availableChoices.map((choice, i) => (
            <motion.button
              key={choice.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: chosen ? (chosen === choice.id ? 1 : 0.15) : 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onClick={() => handleChoice(choice)}
              onMouseEnter={() => !chosen && playSfx('choice-hover')}
              disabled={!!chosen}
              className="group w-full border-l-2 border-parchment-dim/20 py-3 pl-4 text-left transition-all duration-300 hover:border-parchment-dim/55 disabled:cursor-default"
            >
              <span className="block font-narrative text-base leading-snug text-parchment/90 transition-colors duration-200 group-hover:text-parchment">
                {choice.text}
              </span>
              {choice.subtext && (
                <span className="mt-1 block font-ui text-xs italic text-parchment-dim/45">
                  {choice.subtext}
                </span>
              )}
              {chosen === choice.id && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="mt-2 block h-px bg-parchment-dim/30"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

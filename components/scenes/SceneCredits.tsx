'use client'

import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'

const CREDITS = [
  { role: 'Developed by', names: ['Mario Araitoarro', 'Xabier Saez', 'Aitor García'] },
  {
    role: 'Historical basis',
    names: [
      'Dutch resistance networks, 1940–1945',
      'Testimony archives of the Jewish Historical Museum, Amsterdam',
    ],
  },
  {
    role: 'Dedicated to',
    names: [
      'The 102,000 Dutch Jews who did not survive.',
      'And to those who helped them.',
    ],
  },
]

export function SceneCredits() {
  const { resetGame } = useGameStore()

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="w-full max-w-md space-y-12 text-center"
      >
        {/* Title */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="mb-2 font-title text-[10px] uppercase tracking-[0.5em] text-parchment-dim/40"
          >
            Amsterdam · 1942
          </motion.p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="font-title text-3xl uppercase tracking-[0.2em] text-parchment"
          >
            Scaperoom
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="mx-auto mt-4 h-px w-16 bg-parchment-dim/30"
          />
        </div>

        {/* Credits sections */}
        {CREDITS.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2 + si * 0.6 }}
          >
            <p className="mb-2 font-title text-[10px] uppercase tracking-[0.3em] text-parchment-dim/40">
              {section.role}
            </p>
            {section.names.map((name, ni) => (
              <p
                key={ni}
                className="font-narrative text-sm leading-relaxed text-parchment/80"
              >
                {name}
              </p>
            ))}
          </motion.div>
        ))}

        {/* Restart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 4.5 }}
        >
          <button
            onClick={resetGame}
            className="font-title text-xs uppercase tracking-[0.3em] text-parchment-dim/30 transition-colors duration-300 hover:text-parchment-dim/70"
          >
            Begin again
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { getScene } from '@/data/scenes'
import { FadeContainer } from '@/components/ui/FadeContainer'
import { MuseumCard } from '@/components/ui/MuseumCard'
import type { Choice } from '@/types/narrative'

export function SceneIdentitySetup() {
  const { makeChoice, setPlayerInfo, flags } = useGameStore()
  const scene = getScene('identity-setup')
  const [name, setName] = useState('')
  const [selectedBackground, setSelectedBackground] = useState<Choice | null>(null)
  const [step, setStep] = useState<'name' | 'background' | 'confirm'>('name')

  const handleNameSubmit = () => {
    if (!name.trim()) return
    setStep('background')
  }

  const handleBackgroundSelect = (choice: Choice) => {
    setSelectedBackground(choice)
    setStep('confirm')
  }

  const handleConfirm = () => {
    if (!selectedBackground || !name.trim()) return
    const bg = selectedBackground.id.split('-')[0] as 'dutch' | 'polish' | 'french'
    setPlayerInfo(name.trim(), bg)
    makeChoice(selectedBackground)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <FadeContainer>
          <p className="mb-8 font-title text-xs uppercase tracking-[0.35em] text-parchment-dim/50">
            November 1942 · Amsterdam
          </p>
        </FadeContainer>

        <AnimatePresence mode="wait">
          {step === 'name' && (
            <motion.div
              key="name-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="mb-6 font-narrative text-2xl font-light text-parchment">
                What is your name?
              </h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Your name..."
                autoFocus
                className="w-full border-b border-parchment-dim/30 bg-transparent pb-2 font-narrative text-lg text-parchment placeholder-parchment-dim/25 outline-none focus:border-parchment-dim/70"
              />
              <button
                onClick={handleNameSubmit}
                disabled={!name.trim()}
                className="mt-6 font-title text-xs uppercase tracking-[0.3em] text-parchment-dim/60 transition-opacity hover:opacity-100 disabled:opacity-30"
              >
                Continue →
              </button>
            </motion.div>
          )}

          {step === 'background' && (
            <motion.div
              key="background-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="mb-2 font-narrative text-2xl font-light text-parchment">
                {name}.
              </h2>
              <p className="mb-8 font-narrative text-sm italic text-parchment-dim/70">
                Who are you?
              </p>
              <div className="space-y-3">
                {scene.choices?.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleBackgroundSelect(choice)}
                    className="group w-full border-l-2 border-parchment-dim/20 py-4 pl-4 text-left transition-all duration-300 hover:border-parchment-dim/70"
                  >
                    <span className="block font-narrative text-base text-parchment">
                      {choice.text}
                    </span>
                    {choice.subtext && (
                      <span className="mt-1 block font-ui text-xs italic text-parchment-dim/50">
                        {choice.subtext}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'confirm' && selectedBackground && (
            <motion.div
              key="confirm-step"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              <MuseumCard label="Your Identity">
                <p className="font-narrative text-base text-parchment">
                  {name}
                </p>
                <p className="mt-1 font-narrative text-sm italic text-parchment-dim/70">
                  {selectedBackground.text}
                </p>
                <p className="mt-3 font-ui text-xs text-parchment-dim/50">
                  {selectedBackground.subtext}
                </p>
              </MuseumCard>
              <div className="mt-6 flex gap-6">
                <button
                  onClick={() => setStep('background')}
                  className="font-title text-xs uppercase tracking-widest text-parchment-dim/40 hover:text-parchment-dim/70"
                >
                  ← Change
                </button>
                <button
                  onClick={handleConfirm}
                  className="font-title text-xs uppercase tracking-widest text-parchment-dim/70 hover:text-parchment"
                >
                  Begin →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

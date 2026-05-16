'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { getScene } from '@/data/scenes'

export function SceneEpilogue() {
  const { navigateToScene } = useGameStore()
  const scene = getScene('epilogue')
  const blocks = scene.narrator ?? []
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const advance = useCallback(() => {
    if (index < blocks.length - 1) {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => i + 1)
        setVisible(true)
      }, 700)
    } else {
      navigateToScene('credits')
    }
  }, [index, blocks.length, navigateToScene])

  useEffect(() => {
    const block = blocks[index]
    if (!block) return
    const timer = setTimeout(advance, (block.delay ?? 3000) + 1000)
    return () => clearTimeout(timer)
  }, [index, blocks, advance])

  const block = blocks[index]

  return (
    <div
      className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center px-8"
      onClick={advance}
    >
      {/* Museum label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="mb-8 font-title text-[10px] uppercase tracking-[0.4em] text-parchment-dim/50"
      >
        Historical Context
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="mb-8 h-px w-24 bg-parchment-dim/20"
      />

      <AnimatePresence mode="wait">
        {visible && block && (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="max-w-2xl text-center font-narrative text-base leading-loose text-parchment/90 md:text-lg"
          >
            {block.text}
          </motion.p>
        )}
      </AnimatePresence>

      {index === blocks.length - 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="mt-10 font-title text-xs uppercase tracking-[0.3em] text-parchment-dim/40"
        >
          Click to continue
        </motion.p>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { getScene } from '@/data/scenes'
import type { NarratorBlock } from '@/types/narrative'

export function SceneIntro() {
  const { navigateToScene } = useGameStore()
  const scene = getScene('intro')
  const blocks: NarratorBlock[] = scene.narrator ?? []

  const [blockIndex, setBlockIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const advance = useCallback(() => {
    if (blockIndex < blocks.length - 1) {
      setVisible(false)
      setTimeout(() => {
        setBlockIndex((i) => i + 1)
        setVisible(true)
      }, 500)
    } else {
      navigateToScene('identity-setup')
    }
  }, [blockIndex, blocks.length, navigateToScene])

  useEffect(() => {
    const block = blocks[blockIndex]
    if (!block) return
    const delay = block.delay ?? 2000
    const timer = setTimeout(advance, delay + 800)
    return () => clearTimeout(timer)
  }, [blockIndex, blocks, advance])

  const block = blocks[blockIndex]

  return (
    <div
      className="absolute inset-0 flex cursor-pointer items-center justify-center px-8"
      onClick={advance}
    >
      <AnimatePresence mode="wait">
        {visible && block && (
          <motion.p
            key={blockIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="max-w-xl text-center font-narrative text-xl font-light leading-relaxed tracking-wide text-parchment md:text-2xl"
          >
            {block.text}
          </motion.p>
        )}
      </AnimatePresence>

      {blockIndex === blocks.length - 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-24 font-title text-xs uppercase tracking-[0.3em] text-parchment-dim/50"
        >
          Click to continue
        </motion.p>
      )}
    </div>
  )
}

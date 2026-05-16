'use client'

import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.3, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        className="font-title text-xs uppercase tracking-[0.4em] text-parchment-dim/40"
      >
        Amsterdam · 1942
      </motion.div>
    </motion.div>
  )
}

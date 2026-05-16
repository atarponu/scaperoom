'use client'

import { motion } from 'framer-motion'

interface Props {
  visible?: boolean
}

export function LetterboxBars({ visible = true }: Props) {
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 right-0 top-0 z-30 bg-ink"
        animate={{ height: visible ? 60 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 bg-ink"
        animate={{ height: visible ? 60 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  )
}

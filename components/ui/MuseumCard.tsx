'use client'

import { motion } from 'framer-motion'

interface Props {
  label?: string
  children: React.ReactNode
  className?: string
}

export function MuseumCard({ label, children, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`border border-parchment-dim/20 bg-ink/60 px-6 py-5 backdrop-blur-xs ${className}`}
    >
      {label && (
        <p className="mb-3 font-title text-xs uppercase tracking-[0.25em] text-parchment-dim/60">
          {label}
        </p>
      )}
      {children}
    </motion.div>
  )
}

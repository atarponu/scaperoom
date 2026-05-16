'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeContainer({
  children,
  delay = 0,
  duration = 1.2,
  className = '',
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

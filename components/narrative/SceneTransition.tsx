'use client'

import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  sceneKey: string
}

export function SceneTransition({ children, sceneKey }: Props) {
  return (
    <motion.div
      key={sceneKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

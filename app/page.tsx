'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CinematicContainer } from '@/components/cinematic/CinematicContainer'

export default function LandingPage() {
  const router = useRouter()
  const { startExperience, experienceStarted, currentScene } = useGameStore()

  const handleEnter = () => {
    startExperience()
    router.push('/experience')
  }

  const handleResume = () => {
    router.push('/experience')
  }

  return (
    <CinematicContainer tension="none" showLetterbox={false}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1.8, delay: 0.8 }}
            className="mb-4 font-title text-[11px] uppercase tracking-[0.5em] text-parchment-dim/50"
          >
            An Interactive Historical Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 1.2 }}
            className="mb-2 font-title text-5xl uppercase tracking-[0.15em] text-parchment md:text-6xl"
          >
            Scaperoom
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.4, delay: 1.8 }}
            className="mb-10 font-narrative text-sm italic text-parchment-dim"
          >
            Amsterdam · November 1942
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2.2 }}
            className="mx-auto mb-10 h-px w-20 bg-parchment-dim/25"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.6 }}
            className="space-y-4"
          >
            <button
              onClick={handleEnter}
              className="block w-full font-title text-xs uppercase tracking-[0.4em] text-parchment/70 transition-colors duration-300 hover:text-parchment"
            >
              {experienceStarted ? 'Begin Again' : 'Enter'}
            </button>

            {experienceStarted && currentScene !== 'intro' && (
              <button
                onClick={handleResume}
                className="block w-full font-title text-xs uppercase tracking-[0.4em] text-parchment-dim/40 transition-colors duration-300 hover:text-parchment-dim/70"
              >
                Resume
              </button>
            )}
          </motion.div>
        </motion.div>

        {/* Content warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.4 }}
          className="absolute bottom-16 max-w-sm px-4 text-center"
        >
          <p className="font-ui text-[10px] leading-relaxed text-parchment-dim/30">
            This experience contains historical depictions of the Holocaust and Nazi occupation.
            It is designed for educational purposes and treats its subject with seriousness and respect.
            Intended for ages 14 and above.
          </p>
        </motion.div>
      </div>
    </CinematicContainer>
  )
}

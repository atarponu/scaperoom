'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { CinematicContainer } from '@/components/cinematic/CinematicContainer'
import { SceneBackground } from '@/components/cinematic/SceneBackground'
import { SceneTransition } from '@/components/narrative/SceneTransition'
import { SceneIntro } from '@/components/scenes/SceneIntro'
import { SceneIdentitySetup } from '@/components/scenes/SceneIdentitySetup'
import { SceneNarrative } from '@/components/scenes/SceneNarrative'
import { SceneEpilogue } from '@/components/scenes/SceneEpilogue'
import { SceneCredits } from '@/components/scenes/SceneCredits'
import { AudioManager } from '@/components/audio/AudioManager'
import { getScene } from '@/data/scenes'
import type { SceneId } from '@/types/narrative'

function SceneRenderer({ sceneId }: { sceneId: SceneId }) {
  const scene = getScene(sceneId)

  if (sceneId === 'intro') return <SceneIntro />
  if (sceneId === 'identity-setup') return <SceneIdentitySetup />
  if (sceneId === 'epilogue') return <SceneEpilogue />
  if (sceneId === 'credits') return <SceneCredits />

  return <SceneNarrative scene={scene} />
}

export default function ExperiencePage() {
  const { currentScene, isTransitioning, setTransitioning, toMemory, sessionId } =
    useGameStore()

  const scene = getScene(currentScene)

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setTransitioning(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning, setTransitioning])

  // Sync to Supabase on scene change
  useEffect(() => {
    if (!sessionId) return
    const memory = toMemory()
    fetch('/api/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memory,
        complete: currentScene === 'credits',
      }),
    }).catch(() => {
      // Offline — localStorage fallback active via Zustand persist
    })
  }, [currentScene, sessionId, toMemory])

  return (
    <CinematicContainer tension={scene.tension} showLetterbox>
      <AudioManager />

      <AnimatePresence mode="wait">
        <SceneTransition key={currentScene} sceneKey={currentScene}>
          <SceneBackground type={scene.background} />
          <SceneRenderer sceneId={currentScene} />
        </SceneTransition>
      </AnimatePresence>
    </CinematicContainer>
  )
}

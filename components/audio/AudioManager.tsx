'use client'

import { useEffect, useRef } from 'react'
import { playAmbience, ambienceForScene, unlockAudio } from '@/lib/audio/ambient-generator'
import { useGameStore } from '@/stores/gameStore'

export function AudioManager() {
  const currentScene = useGameStore((s) => s.currentScene)
  const prevScene = useRef<string | null>(null)
  const unlocked = useRef(false)

  useEffect(() => {
    const unlock = () => {
      if (unlocked.current) return
      unlocked.current = true
      unlockAudio().then(() => {
        playAmbience(ambienceForScene(currentScene))
      })
    }
    window.addEventListener('click', unlock, { once: true, passive: true })
    window.addEventListener('keydown', unlock, { once: true, passive: true })
    window.addEventListener('touchstart', unlock, { once: true, passive: true })
    return () => {
      window.removeEventListener('click', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!unlocked.current) return
    if (prevScene.current === currentScene) return
    prevScene.current = currentScene
    playAmbience(ambienceForScene(currentScene))
  }, [currentScene])

  return null
}

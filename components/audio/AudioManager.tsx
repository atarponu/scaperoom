'use client'

import { useEffect, useRef } from 'react'
import { playAmbience, ambienceForScene } from '@/lib/audio/ambient-generator'
import { useGameStore } from '@/stores/gameStore'

export function AudioManager() {
  const currentScene = useGameStore((s) => s.currentScene)
  const prevScene = useRef<string | null>(null)

  useEffect(() => {
    if (prevScene.current === currentScene) return
    prevScene.current = currentScene
    playAmbience(ambienceForScene(currentScene))
  }, [currentScene])

  return null
}

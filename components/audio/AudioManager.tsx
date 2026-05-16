'use client'

import { useEffect, useRef } from 'react'
import { playTrack, trackForScene } from '@/lib/audio/manager'
import { useGameStore } from '@/stores/gameStore'

export function AudioManager() {
  const currentScene = useGameStore((s) => s.currentScene)
  const prevScene = useRef<string | null>(null)

  useEffect(() => {
    if (prevScene.current === currentScene) return
    prevScene.current = currentScene
    const track = trackForScene(currentScene)
    playTrack(track).catch(() => {
      // Audio not available — silent fallback
    })
  }, [currentScene])

  return null
}

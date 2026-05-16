import type { Scene, SceneId } from '@/types/narrative'
import { introScene } from './intro'
import { identitySetupScene } from './identity-setup'
import { act1Scenes } from './act1'
import { act2Scenes } from './act2'
import { act3Scenes } from './act3'
import { act4Scenes } from './act4'
import { act5Scenes } from './act5'
import { epilogueScene, creditsScene } from './epilogue'

const allScenes: Scene[] = [
  introScene,
  identitySetupScene,
  ...act1Scenes,
  ...act2Scenes,
  ...act3Scenes,
  ...act4Scenes,
  ...act5Scenes,
  epilogueScene,
  creditsScene,
]

export const SCENE_REGISTRY: Record<SceneId, Scene> = Object.fromEntries(
  allScenes.map((s) => [s.id, s])
) as Record<SceneId, Scene>

export function getScene(id: SceneId): Scene {
  const scene = SCENE_REGISTRY[id]
  if (!scene) {
    console.error(`[getScene] unknown scene "${id}", falling back to intro`)
    return SCENE_REGISTRY['intro']
  }
  return scene
}

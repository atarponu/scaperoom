import type { SceneId, GameFlags, EmotionalState } from './narrative'

export interface Decision {
  sceneId: SceneId
  choiceId: string
  choiceText: string
  timestamp: number
}

export interface NPCRelationship {
  npcId: string
  trust: number
  interactionCount: number
  lastInteraction?: number
}

export interface GameMemory {
  sessionId: string
  playerName: string
  playerBackground: 'dutch' | 'polish' | 'french' | null
  currentScene: SceneId
  sceneHistory: SceneId[]
  decisions: Decision[]
  npcRelationships: Record<string, NPCRelationship>
  riskLevel: number
  emotionalState: EmotionalState
  flags: GameFlags
  startedAt: number
  updatedAt: number
}

export interface DialogueMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface NPCConversationHistory {
  npcId: string
  sessionId: string
  messages: DialogueMessage[]
}

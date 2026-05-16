export type SceneId =
  | 'intro'
  | 'identity-setup'
  | 'act1-building'
  | 'act1-attic'
  | 'act2-checkpoint'
  | 'act2-papers'
  | 'act3-bookshop'
  | 'act3-resistance'
  | 'act3-no-contact'
  | 'act4-preparation'
  | 'act4-street'
  | 'act4-final-checkpoint'
  | 'outcome-a'
  | 'outcome-b'
  | 'outcome-c'
  | 'outcome-d'
  | 'outcome-e'
  | 'epilogue'
  | 'credits'

export type BackgroundType =
  | 'black'
  | 'apartment-hallway'
  | 'apartment-attic'
  | 'street-occupied'
  | 'checkpoint'
  | 'bookshop'
  | 'night-street'
  | 'night-canal'
  | 'safe-house'
  | 'ruins'
  | 'museum'

export type TensionLevel = 'none' | 'low' | 'medium' | 'high' | 'critical'

export type EmotionalState =
  | 'uncertain'
  | 'fearful'
  | 'resolved'
  | 'desperate'
  | 'hopeful'
  | 'grieving'
  | 'numb'

export interface NarratorBlock {
  text: string
  delay?: number
}

export interface DialogueLine {
  speaker: 'npc' | 'player'
  npcId?: string
  text: string
  emotion?: 'neutral' | 'fearful' | 'careful' | 'urgent' | 'cold' | 'warm'
}

export interface GameFlags {
  elsaKnown: boolean
  elsaSafe: boolean
  elsaCaptured: boolean
  contactedResistance: boolean
  resistanceKnowsPlayer: boolean
  liedAtCheckpoint: boolean
  helpedStranger: boolean
  janArrested: boolean
  playerCompromised: boolean
  playerFled: boolean
  documentsForged: boolean
  documentQuality: 'none' | 'poor' | 'adequate' | 'good'
}

export interface ChoiceConsequence {
  nextScene: SceneId
  description?: string
  flagChanges?: Partial<GameFlags>
  trustDeltas?: Record<string, number>
  riskDelta?: number
  emotionalState?: EmotionalState
}

export interface Choice {
  id: string
  text: string
  subtext?: string
  consequence: ChoiceConsequence
  requiresFlag?: keyof GameFlags
  requiresFlagValue?: boolean
}

export interface Scene {
  id: SceneId
  actTitle?: string
  background: BackgroundType
  ambientAudio?: string
  tension: TensionLevel
  narrator?: NarratorBlock[]
  npcId?: string
  useAIDialogue?: boolean
  staticDialogue?: DialogueLine[]
  choices?: Choice[]
  defaultNext?: SceneId
  autoAdvanceMs?: number
}

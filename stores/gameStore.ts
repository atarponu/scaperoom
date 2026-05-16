'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SceneId, GameFlags, Choice, EmotionalState } from '@/types/narrative'
import type { GameMemory, Decision, NPCRelationship, DialogueMessage } from '@/types/memory'

const DEFAULT_FLAGS: GameFlags = {
  elsaKnown: false,
  elsaSafe: false,
  elsaCaptured: false,
  contactedResistance: false,
  resistanceKnowsPlayer: false,
  liedAtCheckpoint: false,
  helpedStranger: false,
  janArrested: false,
  playerCompromised: false,
  playerFled: false,
  documentsForged: false,
  documentQuality: 'none',
}

const DEFAULT_NPC_RELATIONSHIPS: Record<string, NPCRelationship> = {
  elsa: { npcId: 'elsa', trust: 0, interactionCount: 0 },
  werner: { npcId: 'werner', trust: -0.8, interactionCount: 0 },
  marta: { npcId: 'marta', trust: 0, interactionCount: 0 },
  jan: { npcId: 'jan', trust: 0, interactionCount: 0 },
  mrs_devries: { npcId: 'mrs_devries', trust: 0.2, interactionCount: 0 },
}

interface GameState {
  sessionId: string | null
  playerName: string
  playerBackground: 'dutch' | 'polish' | 'french' | null
  currentScene: SceneId
  sceneHistory: SceneId[]
  decisions: Decision[]
  npcRelationships: Record<string, NPCRelationship>
  riskLevel: number
  emotionalState: EmotionalState
  flags: GameFlags
  isTransitioning: boolean
  dialogueHistories: Record<string, DialogueMessage[]>
  experienceStarted: boolean
  startedAt: number | null

  setSessionId: (id: string) => void
  setPlayerInfo: (name: string, background: 'dutch' | 'polish' | 'french') => void
  navigateToScene: (sceneId: SceneId) => void
  makeChoice: (choice: Choice) => void
  updateNPCTrust: (npcId: string, delta: number) => void
  adjustRisk: (delta: number) => void
  setFlag: <K extends keyof GameFlags>(key: K, value: GameFlags[K]) => void
  setEmotionalState: (state: EmotionalState) => void
  addDialogueMessage: (npcId: string, msg: DialogueMessage) => void
  setTransitioning: (v: boolean) => void
  startExperience: () => void
  resetGame: () => void
  toMemory: () => GameMemory
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      playerName: '',
      playerBackground: null,
      currentScene: 'intro',
      sceneHistory: [],
      decisions: [],
      npcRelationships: { ...DEFAULT_NPC_RELATIONSHIPS },
      riskLevel: 10,
      emotionalState: 'uncertain',
      flags: { ...DEFAULT_FLAGS },
      isTransitioning: false,
      dialogueHistories: {},
      experienceStarted: false,
      startedAt: null,

      setSessionId: (id) => set({ sessionId: id }),

      setPlayerInfo: (name, background) =>
        set({ playerName: name, playerBackground: background }),

      navigateToScene: (sceneId) =>
        set((s) => ({
          sceneHistory: [...s.sceneHistory, s.currentScene],
          currentScene: sceneId,
          isTransitioning: true,
        })),

      makeChoice: (choice) => {
        const s = get()
        const decision: Decision = {
          sceneId: s.currentScene,
          choiceId: choice.id,
          choiceText: choice.text,
          timestamp: Date.now(),
        }
        const { consequence } = choice

        set((prev) => {
          const updatedRelationships = { ...prev.npcRelationships }
          if (consequence.trustDeltas) {
            for (const [npcId, delta] of Object.entries(consequence.trustDeltas)) {
              const rel = updatedRelationships[npcId] ?? {
                npcId,
                trust: 0,
                interactionCount: 0,
              }
              updatedRelationships[npcId] = {
                ...rel,
                trust: Math.max(-1, Math.min(1, rel.trust + delta)),
                interactionCount: rel.interactionCount + 1,
                lastInteraction: Date.now(),
              }
            }
          }

          return {
            decisions: [...prev.decisions, decision],
            npcRelationships: updatedRelationships,
            riskLevel: Math.max(
              0,
              Math.min(100, prev.riskLevel + (consequence.riskDelta ?? 0))
            ),
            flags: consequence.flagChanges
              ? { ...prev.flags, ...consequence.flagChanges }
              : prev.flags,
            emotionalState:
              consequence.emotionalState ?? prev.emotionalState,
          }
        })

        get().navigateToScene(consequence.nextScene)
      },

      updateNPCTrust: (npcId, delta) =>
        set((s) => {
          const rel = s.npcRelationships[npcId] ?? {
            npcId,
            trust: 0,
            interactionCount: 0,
          }
          return {
            npcRelationships: {
              ...s.npcRelationships,
              [npcId]: {
                ...rel,
                trust: Math.max(-1, Math.min(1, rel.trust + delta)),
                interactionCount: rel.interactionCount + 1,
                lastInteraction: Date.now(),
              },
            },
          }
        }),

      adjustRisk: (delta) =>
        set((s) => ({
          riskLevel: Math.max(0, Math.min(100, s.riskLevel + delta)),
        })),

      setFlag: (key, value) =>
        set((s) => ({ flags: { ...s.flags, [key]: value } })),

      setEmotionalState: (state) => set({ emotionalState: state }),

      addDialogueMessage: (npcId, msg) =>
        set((s) => ({
          dialogueHistories: {
            ...s.dialogueHistories,
            [npcId]: [...(s.dialogueHistories[npcId] ?? []), msg].slice(-12),
          },
        })),

      setTransitioning: (v) => set({ isTransitioning: v }),

      startExperience: () =>
        set({ experienceStarted: true, startedAt: Date.now() }),

      resetGame: () =>
        set({
          sessionId: null,
          playerName: '',
          playerBackground: null,
          currentScene: 'intro',
          sceneHistory: [],
          decisions: [],
          npcRelationships: { ...DEFAULT_NPC_RELATIONSHIPS },
          riskLevel: 10,
          emotionalState: 'uncertain',
          flags: { ...DEFAULT_FLAGS },
          isTransitioning: false,
          dialogueHistories: {},
          experienceStarted: false,
          startedAt: null,
        }),

      toMemory: (): GameMemory => {
        const s = get()
        return {
          sessionId: s.sessionId ?? '',
          playerName: s.playerName,
          playerBackground: s.playerBackground,
          currentScene: s.currentScene,
          sceneHistory: s.sceneHistory,
          decisions: s.decisions,
          npcRelationships: s.npcRelationships,
          riskLevel: s.riskLevel,
          emotionalState: s.emotionalState,
          flags: s.flags,
          startedAt: s.startedAt ?? Date.now(),
          updatedAt: Date.now(),
        }
      },
    }),
    {
      name: 'scaperoom-game-state',
      partialize: (s) => ({
        sessionId: s.sessionId,
        playerName: s.playerName,
        playerBackground: s.playerBackground,
        currentScene: s.currentScene,
        sceneHistory: s.sceneHistory,
        decisions: s.decisions,
        npcRelationships: s.npcRelationships,
        riskLevel: s.riskLevel,
        emotionalState: s.emotionalState,
        flags: s.flags,
        dialogueHistories: s.dialogueHistories,
        experienceStarted: s.experienceStarted,
        startedAt: s.startedAt,
      }),
    }
  )
)

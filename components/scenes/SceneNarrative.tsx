'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { DialogueBox } from '@/components/narrative/DialogueBox'
import { ChoicePanel } from '@/components/narrative/ChoicePanel'
import { NPCPortrait } from '@/components/narrative/NPCPortrait'
import { NPC_DEFINITIONS } from '@/data/npcs/definitions'
import type { Scene, NarratorBlock } from '@/types/narrative'

interface Props {
  scene: Scene
}

type Phase = 'narration' | 'dialogue' | 'choices'

export function SceneNarrative({ scene }: Props) {
  const { makeChoice, flags, npcRelationships } = useGameStore()
  const [narratorIndex, setNarratorIndex] = useState(0)
  const [narratorVisible, setNarratorVisible] = useState(true)
  const [phase, setPhase] = useState<Phase>(
    scene.narrator && scene.narrator.length > 0 ? 'narration' : scene.npcId ? 'dialogue' : 'choices'
  )

  const blocks: NarratorBlock[] = scene.narrator ?? []
  const npc = scene.npcId ? NPC_DEFINITIONS[scene.npcId] : null
  const trust = npc ? (npcRelationships[npc.id]?.trust ?? 0) : 0

  const advanceNarrator = useCallback(() => {
    if (narratorIndex < blocks.length - 1) {
      setNarratorVisible(false)
      setTimeout(() => {
        setNarratorIndex((i) => i + 1)
        setNarratorVisible(true)
      }, 600)
    } else {
      if (scene.npcId) {
        setPhase('dialogue')
      } else if (scene.choices && scene.choices.length > 0) {
        setPhase('choices')
      } else if (scene.defaultNext) {
        makeChoice({
          id: '__auto__',
          text: '',
          consequence: { nextScene: scene.defaultNext },
        })
      }
    }
  }, [narratorIndex, blocks.length, scene, makeChoice])

  useEffect(() => {
    if (phase !== 'narration' || blocks.length === 0) return
    const block = blocks[narratorIndex]
    if (!block) return
    const delay = (block.delay ?? 2000) + 700
    const timer = setTimeout(advanceNarrator, delay)
    return () => clearTimeout(timer)
  }, [phase, narratorIndex, blocks, advanceNarrator])

  const handleDialogueComplete = () => {
    if (scene.choices && scene.choices.length > 0) {
      setPhase('choices')
    } else if (scene.defaultNext) {
      makeChoice({
        id: '__auto__',
        text: '',
        consequence: { nextScene: scene.defaultNext },
      })
    }
  }

  const currentBlock = blocks[narratorIndex]

  return (
    <div className="absolute inset-0 flex items-end pb-16 md:pb-20">
      <div className="flex w-full items-end gap-6 px-8 md:px-16">
        {/* NPC Portrait */}
        {npc && phase !== 'narration' && (
          <div className="hidden shrink-0 md:block">
            <NPCPortrait npc={npc} trust={trust} />
          </div>
        )}

        {/* Content area */}
        <div className="flex-1">
          {/* Act title */}
          {scene.actTitle && phase === 'narration' && narratorIndex === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 font-title text-xs uppercase tracking-[0.35em] text-parchment-dim/40"
            >
              {scene.actTitle}
            </motion.p>
          )}

          {/* Narration */}
          <AnimatePresence mode="wait">
            {phase === 'narration' && narratorVisible && currentBlock && (
              <motion.div
                key={narratorIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="cursor-pointer"
                onClick={advanceNarrator}
              >
                <p className="font-narrative text-lg font-light leading-relaxed text-parchment md:text-xl">
                  {currentBlock.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dialogue */}
          {phase === 'dialogue' && npc && (
            <DialogueBox
              npcId={npc.id}
              npcName={npc.name}
              staticLines={scene.staticDialogue}
              useAI={scene.useAIDialogue}
              onDialogueComplete={handleDialogueComplete}
            />
          )}

          {/* Choices */}
          {phase === 'choices' && scene.choices && (
            <ChoicePanel
              choices={scene.choices}
              flags={flags}
              onChoice={makeChoice}
            />
          )}
        </div>
      </div>
    </div>
  )
}

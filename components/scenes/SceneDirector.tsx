'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '@/stores/gameStore'
import { ChoicePanel } from '@/components/narrative/ChoicePanel'
import { NPCPortrait } from '@/components/narrative/NPCPortrait'
import { NPC_DEFINITIONS } from '@/data/npcs/definitions'
import { playSfx, sfxForScene } from '@/lib/audio/sfx'
import type { Scene } from '@/types/narrative'
import type { DialogueMessage } from '@/types/memory'

interface Props {
  scene: Scene
}

type Phase = 'title' | 'narration' | 'dialogue' | 'choices'

/* ─── NPC Dialogue Panel ────────────────────────────────────────── */
function NPCDialoguePanel({
  npcId,
  npcName,
  staticLines,
  useAI,
  onComplete,
}: {
  npcId: string
  npcName: string
  staticLines?: { text: string; emotion?: string }[]
  useAI?: boolean
  onComplete?: () => void
}) {
  const {
    toMemory,
    addDialogueMessage,
    dialogueHistories,
    npcRelationships,
  } = useGameStore()

  // Load persisted history from store on mount
  const storedHistory = dialogueHistories[npcId] ?? []
  const [history, setHistory] = useState<DialogueMessage[]>(storedHistory)

  const [staticIdx, setStaticIdx] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [writingStatic, setWritingStatic] = useState(true)
  const [staticDone, setStaticDone] = useState(!staticLines?.length)
  const [playerInput, setPlayerInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamText, setStreamText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lines = staticLines ?? []
  const currentLine = lines[staticIdx]
  const trust = npcRelationships[npcId]?.trust ?? 0

  // Typewriter for static lines
  useEffect(() => {
    if (!currentLine || !writingStatic) return
    let idx = 0
    setDisplayedText('')
    const tick = () => {
      idx++
      setDisplayedText(currentLine.text.slice(0, idx))
      if (idx < currentLine.text.length) {
        timerRef.current = setTimeout(tick, 30)
      } else {
        setWritingStatic(false)
      }
    }
    timerRef.current = setTimeout(tick, 30)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [currentLine, staticIdx]) // eslint-disable-line

  const advanceLine = useCallback(() => {
    if (writingStatic && currentLine) {
      // Skip to end
      if (timerRef.current) clearTimeout(timerRef.current)
      setDisplayedText(currentLine.text)
      setWritingStatic(false)
      return
    }
    if (staticIdx < lines.length - 1) {
      setStaticIdx(i => i + 1)
      setWritingStatic(true)
    } else {
      setStaticDone(true)
      if (!useAI) onComplete?.()
      else setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [writingStatic, staticIdx, lines.length, useAI, onComplete, currentLine])

  const sendMessage = async () => {
    const msg = playerInput.trim()
    if (!msg || streaming) return
    setPlayerInput('')
    setStreaming(true)
    setStreamText('')

    const userMsg: DialogueMessage = { role: 'user', content: msg, timestamp: Date.now() }
    const next = [...history, userMsg]
    setHistory(next)
    addDialogueMessage(npcId, userMsg)

    const memory = toMemory()
    const res = await fetch('/api/dialogue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npcId, playerMessage: msg, memory, history: dialogueHistories[npcId] ?? [] }),
    })

    if (!res.body) { setStreaming(false); return }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let full = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      full += decoder.decode(value)
      setStreamText(full)
    }

    const assistantMsg: DialogueMessage = { role: 'assistant', content: full, timestamp: Date.now() }
    setHistory(h => [...h, assistantMsg])
    addDialogueMessage(npcId, assistantMsg)
    setStreaming(false)
    setStreamText('')
  }

  return (
    <div className="relative">
      {/* NPC name header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-3 flex items-center gap-3"
      >
        <div className="h-px flex-1 bg-parchment-dim/15" />
        <span className="font-title text-[10px] uppercase tracking-[0.35em] text-parchment-dim/60">
          {npcName}
        </span>
        <div className="h-px flex-1 bg-parchment-dim/15" />
      </motion.div>

      {/* Trust context (visual only — no number) */}
      {trust > 0.4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-2 font-ui text-[10px] italic text-parchment-dim/30"
        >
          {trust > 0.7 ? 'They speak more freely with you now.' : 'A fragile trust, carefully held.'}
        </motion.div>
      )}

      {/* Static dialogue line */}
      <AnimatePresence mode="wait">
        {!staticDone && currentLine && (
          <motion.div
            key={staticIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 min-h-[5rem] cursor-pointer"
            onClick={advanceLine}
          >
            <p className="font-narrative text-lg leading-relaxed text-parchment md:text-xl">
              {displayedText}
              {writingStatic && (
                <span className="ml-px inline-block w-[2px] animate-pulse bg-parchment-dim opacity-70">&nbsp;</span>
              )}
            </p>
            {!writingStatic && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-3 font-title text-[10px] uppercase tracking-[0.3em] text-parchment-dim/30"
              >
                Click to continue
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past AI conversation history */}
      {staticDone && history.length > 0 && (
        <div className="mb-4 max-h-52 space-y-3 overflow-y-auto pr-2">
          {history.slice(-6).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-right font-narrative italic text-parchment-dim/60'
                  : 'text-left font-narrative text-parchment/85'
              }`}
            >
              {msg.role === 'user' && (
                <span className="mr-1 font-title text-[9px] uppercase tracking-widest text-parchment-dim/30">You </span>
              )}
              {msg.content}
            </motion.div>
          ))}
        </div>
      )}

      {/* Streaming response */}
      {streaming && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 font-narrative text-lg leading-relaxed text-parchment"
        >
          {streamText}
          <span className="ml-px inline-block w-[2px] animate-pulse bg-parchment-dim">&nbsp;</span>
        </motion.p>
      )}

      {/* Player input */}
      {staticDone && useAI && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 border-t border-parchment-dim/10 pt-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={playerInput}
            onChange={e => setPlayerInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Speak..."
            disabled={streaming}
            className="flex-1 border-b border-parchment-dim/25 bg-transparent pb-1 font-narrative text-sm text-parchment placeholder-parchment-dim/25 outline-none focus:border-parchment-dim/55"
          />
          <button
            onClick={sendMessage}
            disabled={streaming || !playerInput.trim()}
            className="font-title text-[10px] uppercase tracking-widest text-parchment-dim/50 transition-colors hover:text-parchment disabled:opacity-25"
          >
            Say
          </button>
          {onComplete && (
            <button
              onClick={onComplete}
              className="font-title text-[10px] uppercase tracking-widest text-parchment-dim/30 transition-colors hover:text-parchment-dim/60"
            >
              Leave →
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

/* ─── SceneDirector ─────────────────────────────────────────────── */
export function SceneDirector({ scene }: Props) {
  const { makeChoice, flags, npcRelationships } = useGameStore()

  const blocks = scene.narrator ?? []
  const npc = scene.npcId ? NPC_DEFINITIONS[scene.npcId] : null
  const trust = npc ? (npcRelationships[npc.id]?.trust ?? 0) : 0

  const hasTitle = !!scene.actTitle
  const hasNarration = blocks.length > 0
  const hasDialogue = !!scene.npcId

  const initialPhase: Phase =
    hasTitle ? 'title' :
    hasNarration ? 'narration' :
    hasDialogue ? 'dialogue' : 'choices'

  const [phase, setPhase] = useState<Phase>(initialPhase)
  const [narratorIdx, setNarratorIdx] = useState(0)
  const [narratorVisible, setNarratorVisible] = useState(true)

  // Reset + scene-entry SFX when scene changes
  useEffect(() => {
    setPhase(initialPhase)
    setNarratorIdx(0)
    setNarratorVisible(true)
    const sfx = sfxForScene(scene.id)
    if (sfx) {
      const t = setTimeout(() => playSfx(sfx), 800)
      return () => clearTimeout(t)
    }
  }, [scene.id]) // eslint-disable-line

  // Title card auto-dismiss after 2.5s
  useEffect(() => {
    if (phase !== 'title') return
    const t = setTimeout(() => setPhase(hasNarration ? 'narration' : hasDialogue ? 'dialogue' : 'choices'), 2500)
    return () => clearTimeout(t)
  }, [phase, hasNarration, hasDialogue])

  const advanceNarrator = useCallback(() => {
    if (narratorIdx < blocks.length - 1) {
      setNarratorVisible(false)
      setTimeout(() => {
        setNarratorIdx(i => i + 1)
        setNarratorVisible(true)
      }, 500)
    } else {
      if (hasDialogue) setPhase('dialogue')
      else if (scene.choices?.length) setPhase('choices')
      else if (scene.defaultNext) {
        makeChoice({ id: '__auto__', text: '', consequence: { nextScene: scene.defaultNext } })
      }
    }
  }, [narratorIdx, blocks.length, hasDialogue, scene, makeChoice])

  const handleDialogueComplete = useCallback(() => {
    if (scene.choices?.length) setPhase('choices')
    else if (scene.defaultNext) {
      makeChoice({ id: '__auto__', text: '', consequence: { nextScene: scene.defaultNext } })
    }
  }, [scene, makeChoice])

  const currentBlock = blocks[narratorIdx]

  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      {/* Act title card */}
      <AnimatePresence>
        {phase === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mx-auto mb-4 h-px w-16 bg-parchment-dim/30"
              />
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="font-title text-sm uppercase tracking-[0.4em] text-parchment-dim/50"
              >
                {scene.actTitle}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mx-auto mt-4 h-px w-16 bg-parchment-dim/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom panel — glass-morphism dark */}
      {phase !== 'title' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-4 mb-20 md:mx-16 md:mb-20"
        >
          <div className="relative flex items-end gap-5 rounded-sm border border-parchment-dim/8 bg-ink/82 px-6 py-5 shadow-2xl backdrop-blur-sm md:px-8 md:py-6">
            {/* NPC Portrait */}
            {npc && (phase === 'dialogue' || phase === 'choices') && (
              <div className="hidden shrink-0 md:block">
                <NPCPortrait npc={npc} trust={trust} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Narrator block */}
              <AnimatePresence mode="wait">
                {phase === 'narration' && narratorVisible && currentBlock && (
                  <motion.div
                    key={narratorIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="cursor-pointer"
                    onClick={advanceNarrator}
                  >
                    <p className="font-narrative text-lg font-light leading-relaxed text-parchment md:text-xl">
                      {currentBlock.text}
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: (currentBlock.delay ?? 2000) / 1000 * 0.6 }}
                      className="mt-3 font-title text-[10px] uppercase tracking-[0.3em] text-parchment-dim/25"
                    >
                      Click to continue
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dialogue */}
              {phase === 'dialogue' && npc && (
                <NPCDialoguePanel
                  key={scene.id}
                  npcId={npc.id}
                  npcName={npc.name}
                  staticLines={scene.staticDialogue}
                  useAI={scene.useAIDialogue}
                  onComplete={handleDialogueComplete}
                />
              )}

              {/* Choices */}
              {phase === 'choices' && scene.choices && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4 font-title text-[10px] uppercase tracking-[0.3em] text-parchment-dim/35">
                    What do you do?
                  </div>
                  <ChoicePanel
                    choices={scene.choices}
                    flags={flags}
                    onChoice={makeChoice}
                  />
                </motion.div>
              )}
            </div>

            {/* Narration progress dots */}
            {phase === 'narration' && blocks.length > 1 && (
              <div className="absolute bottom-2 right-4 flex gap-1">
                {blocks.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                      i === narratorIdx ? 'bg-parchment-dim/50' : 'bg-parchment-dim/15'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

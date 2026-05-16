'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TypewriterText } from '@/components/ui/TypewriterText'
import type { DialogueLine } from '@/types/narrative'
import type { DialogueMessage } from '@/types/memory'
import { useGameStore } from '@/stores/gameStore'

interface Props {
  npcId: string
  npcName: string
  staticLines?: DialogueLine[]
  useAI?: boolean
  onDialogueComplete?: () => void
}

export function DialogueBox({
  npcId,
  npcName,
  staticLines,
  useAI = false,
  onDialogueComplete,
}: Props) {
  const [lineIndex, setLineIndex] = useState(0)
  const [aiText, setAiText] = useState('')
  const [aiStreaming, setAiStreaming] = useState(false)
  const [playerInput, setPlayerInput] = useState('')
  const [aiHistory, setAiHistory] = useState<DialogueMessage[]>([])
  const [showPlayerInput, setShowPlayerInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { toMemory, addDialogueMessage, dialogueHistories } = useGameStore()

  const lines = staticLines ?? []
  const currentLine = lines[lineIndex]
  const isLastStaticLine = lineIndex >= lines.length - 1

  const handleLineComplete = useCallback(() => {
    if (!isLastStaticLine) return
    if (useAI) {
      setShowPlayerInput(true)
    } else {
      onDialogueComplete?.()
    }
  }, [isLastStaticLine, useAI, onDialogueComplete])

  const handleNextLine = () => {
    if (lineIndex < lines.length - 1) {
      setLineIndex((i) => i + 1)
    }
  }

  const sendAIMessage = async () => {
    const msg = playerInput.trim()
    if (!msg || aiStreaming) return
    setPlayerInput('')
    setAiStreaming(true)
    setAiText('')

    const userMsg: DialogueMessage = {
      role: 'user',
      content: msg,
      timestamp: Date.now(),
    }
    const nextHistory = [...aiHistory, userMsg]
    setAiHistory(nextHistory)
    addDialogueMessage(npcId, userMsg)

    const memory = toMemory()
    const history = dialogueHistories[npcId] ?? []

    const res = await fetch('/api/dialogue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ npcId, playerMessage: msg, memory, history }),
    })

    if (!res.body) {
      setAiStreaming(false)
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let full = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = decoder.decode(value)
      full += chunk
      setAiText(full)
    }

    const assistantMsg: DialogueMessage = {
      role: 'assistant',
      content: full,
      timestamp: Date.now(),
    }
    setAiHistory((h) => [...h, assistantMsg])
    addDialogueMessage(npcId, assistantMsg)
    setAiStreaming(false)
  }

  return (
    <div className="relative">
      {/* NPC speaker label */}
      <div className="mb-2 font-title text-xs uppercase tracking-[0.3em] text-parchment-dim/70">
        {npcName}
      </div>

      {/* Static dialogue */}
      <AnimatePresence mode="wait">
        {currentLine && (
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 min-h-[4rem]"
            onClick={handleNextLine}
          >
            <TypewriterText
              text={currentLine.text}
              speed={28}
              onComplete={handleLineComplete}
              className="font-narrative text-lg leading-relaxed text-parchment"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI dialogue history */}
      {aiHistory.length > 0 && (
        <div className="mb-4 max-h-48 space-y-3 overflow-y-auto">
          {aiHistory.slice(-4).map((msg, i) => (
            <div
              key={i}
              className={`text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-right italic text-parchment-dim/70'
                  : 'text-left text-parchment/90'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      )}

      {/* Streaming AI response */}
      {aiStreaming && aiText && (
        <div className="mb-4 font-narrative text-lg leading-relaxed text-parchment">
          {aiText}
          <span className="ml-px inline-block w-[2px] animate-pulse bg-parchment-dim">&nbsp;</span>
        </div>
      )}

      {/* Player input for AI dialogue */}
      {showPlayerInput && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendAIMessage()}
            placeholder="Speak..."
            disabled={aiStreaming}
            className="flex-1 border-b border-parchment-dim/30 bg-transparent px-1 pb-1 font-narrative text-sm text-parchment placeholder-parchment-dim/30 outline-none focus:border-parchment-dim/60"
          />
          <button
            onClick={sendAIMessage}
            disabled={aiStreaming || !playerInput.trim()}
            className="px-3 pb-1 font-title text-xs uppercase tracking-widest text-parchment-dim/60 transition-colors hover:text-parchment disabled:opacity-30"
          >
            Say
          </button>
          {onDialogueComplete && (
            <button
              onClick={onDialogueComplete}
              className="px-3 pb-1 font-title text-xs uppercase tracking-widest text-parchment-dim/40 transition-colors hover:text-parchment-dim/70"
            >
              Continue →
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

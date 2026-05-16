import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { buildNPCSystemPrompt, buildDialogueMessages } from '@/lib/ai/dialogue'
import { NPC_DEFINITIONS } from '@/data/npcs/definitions'
import type { GameMemory, DialogueMessage } from '@/types/memory'

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
}

export async function POST(req: NextRequest) {
  const {
    npcId,
    playerMessage,
    memory,
    history,
  }: {
    npcId: string
    playerMessage: string
    memory: GameMemory
    history: DialogueMessage[]
  } = await req.json()

  const npc = NPC_DEFINITIONS[npcId]
  if (!npc) {
    return new Response(JSON.stringify({ error: 'Unknown NPC' }), { status: 400 })
  }

  const systemPrompt = buildNPCSystemPrompt(npc, memory)
  const messages = buildDialogueMessages(systemPrompt, history, playerMessage)

  const openai = getOpenAI()
  const stream = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    messages,
    max_tokens: 200,
    temperature: 0.7,
    stream: true,
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) {
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}

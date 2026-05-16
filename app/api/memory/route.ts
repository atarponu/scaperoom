import { NextRequest, NextResponse } from 'next/server'
import { saveMemorySnapshot, markSessionComplete } from '@/lib/supabase/queries'
import type { GameMemory } from '@/types/memory'

export async function POST(req: NextRequest) {
  const { memory, complete }: { memory: GameMemory; complete?: boolean } =
    await req.json()

  if (!memory.sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  await saveMemorySnapshot(memory.sessionId, memory)

  if (complete) {
    await markSessionComplete(memory.sessionId)
  }

  return NextResponse.json({ ok: true })
}

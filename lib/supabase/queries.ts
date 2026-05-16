import { getSupabase } from './client'
import type { GameMemory } from '@/types/memory'

export async function createSession(playerName: string): Promise<string> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('sessions')
    .insert({ player_name: playerName })
    .select('id')
    .single()

  if (error) throw error
  return data.id
}

export async function loadSession(sessionId: string): Promise<GameMemory | null> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('memory_snapshots')
    .select('snapshot')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return data.snapshot as GameMemory
}

export async function saveMemorySnapshot(
  sessionId: string,
  memory: GameMemory
): Promise<void> {
  const supabase = getSupabase()
  await supabase
    .from('memory_snapshots')
    .insert({ session_id: sessionId, snapshot: memory })

  await supabase
    .from('sessions')
    .update({
      current_scene: memory.currentScene,
      updated_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
}

export async function markSessionComplete(sessionId: string): Promise<void> {
  const supabase = getSupabase()
  await supabase
    .from('sessions')
    .update({ completed: true, updated_at: new Date().toISOString() })
    .eq('id', sessionId)
}

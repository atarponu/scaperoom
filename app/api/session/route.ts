import { NextRequest, NextResponse } from 'next/server'
import { createSession, loadSession } from '@/lib/supabase/queries'

export async function POST(req: NextRequest) {
  const { playerName } = await req.json()
  const sessionId = await createSession(playerName)
  return NextResponse.json({ sessionId })
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId')
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })

  const memory = await loadSession(sessionId)
  return NextResponse.json({ memory })
}

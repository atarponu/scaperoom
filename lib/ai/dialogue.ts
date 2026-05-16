import type { NPCDefinition } from '@/types/npc'
import type { GameMemory, DialogueMessage } from '@/types/memory'

export function buildNPCSystemPrompt(
  npc: NPCDefinition,
  memory: GameMemory
): string {
  const { flags, npcRelationships, riskLevel, playerName, playerBackground } = memory
  const rel = npcRelationships[npc.id]
  const trust = rel?.trust ?? 0

  const playerDesc = playerName
    ? `The person you are speaking with is named ${playerName}, a ${playerBackground ?? 'local'} civilian.`
    : 'You are speaking with a local civilian.'

  const trustContext =
    trust > 0.5
      ? 'You have come to trust this person cautiously.'
      : trust < -0.3
      ? 'You are deeply suspicious of this person.'
      : 'You are guarded but not hostile.'

  const riskContext =
    riskLevel > 60
      ? 'The situation feels increasingly dangerous. Patrols are more frequent.'
      : riskLevel > 35
      ? 'There is tension in the air. You are careful with your words.'
      : 'The occupation is oppressive but today feels relatively quiet.'

  const flagContext: string[] = []
  if (flags.helpedStranger && npc.id === 'marta') {
    flagContext.push('You have heard that this person helped someone at a checkpoint.')
  }
  if (flags.liedAtCheckpoint && npc.id === 'werner') {
    flagContext.push('You suspect this person may not have been entirely honest during a previous inspection.')
  }
  if (flags.contactedResistance && npc.id === 'elsa') {
    flagContext.push('You know this person has made contact with people who help Jews. You feel fragile hope.')
  }

  return `${npc.systemPrompt}

CURRENT SITUATION (${new Date().getFullYear() === 1942 ? '1942' : 'November 1942'}):
${playerDesc}
${trustContext}
${riskContext}
${flagContext.join(' ')}

STRICT CONSTRAINTS:
- Keep every response under 4 sentences.
- Do not use modern slang or contemporary references.
- Speak with authentic emotional restraint — this is not a theatrical performance, it is survival.
- Never reference game mechanics, choices, or scores.
- Never be melodramatic. Real fear is quiet, not loud.
- If asked about dangerous topics, deflect with period-appropriate caution.`
}

export function buildDialogueMessages(
  systemPrompt: string,
  history: DialogueMessage[],
  playerMessage: string
): { role: 'system' | 'user' | 'assistant'; content: string }[] {
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
  ]

  for (const msg of history.slice(-6)) {
    messages.push({ role: msg.role, content: msg.content })
  }

  messages.push({ role: 'user', content: playerMessage })
  return messages
}

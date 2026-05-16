import type { SceneId, GameFlags } from '@/types/narrative'
import type { GameMemory } from '@/types/memory'

export function resolveOutcomeScene(memory: GameMemory): SceneId {
  const { flags, riskLevel } = memory

  if (!flags.elsaKnown) return 'outcome-e'
  if (flags.elsaCaptured) return 'outcome-c'

  if (flags.contactedResistance && riskLevel < 40) {
    return 'outcome-a'
  }
  if (flags.contactedResistance && riskLevel >= 40 && riskLevel < 65) {
    return 'outcome-d'
  }
  if (!flags.contactedResistance && riskLevel < 60) {
    return 'outcome-b'
  }

  return 'outcome-c'
}

export function computeDocumentQuality(memory: GameMemory): GameFlags['documentQuality'] {
  if (!memory.flags.contactedResistance) return 'poor'
  const janTrust = memory.npcRelationships.jan?.trust ?? 0
  const martaTrust = memory.npcRelationships.marta?.trust ?? 0
  const avgTrust = (janTrust + martaTrust) / 2

  if (avgTrust > 0.6) return 'good'
  if (avgTrust > 0.3) return 'adequate'
  return 'poor'
}

export function narrativeToneForRisk(riskLevel: number): string {
  if (riskLevel < 20) return 'cautious'
  if (riskLevel < 40) return 'watchful'
  if (riskLevel < 60) return 'tense'
  if (riskLevel < 80) return 'dangerous'
  return 'critical'
}

export function checkpointOutcome(
  memory: GameMemory
): 'pass' | 'detained' | 'escalate' {
  const { flags, riskLevel } = memory
  const quality = flags.documentQuality

  if (quality === 'good' && riskLevel < 50) return 'pass'
  if (quality === 'adequate' && riskLevel < 35) return 'pass'
  if (quality === 'poor' || riskLevel > 70) return 'detained'
  if (flags.liedAtCheckpoint && riskLevel > 50) return 'escalate'

  return Math.random() < 0.3 ? 'detained' : 'pass'
}

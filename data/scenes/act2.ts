import type { Scene } from '@/types/narrative'

export const act2Scenes: Scene[] = [
  {
    id: 'act2-checkpoint',
    actTitle: 'Act II — The Checkpoint',
    background: 'street-occupied',
    tension: 'high',
    ambientAudio: 'ambient-street',
    narrator: [
      {
        text: 'Afternoon. You need bread — or what passes for it now.',
        delay: 2000,
      },
      {
        text: 'To reach the market, you must cross Herengracht.',
        delay: 2000,
      },
      {
        text: 'There is a checkpoint.',
        delay: 1400,
      },
      {
        text: 'There is always a checkpoint.',
        delay: 1800,
      },
      {
        text: 'The queue moves slowly. An older man ahead of you — you\'ve never seen him before — is struggling to produce his papers.',
        delay: 3200,
      },
      {
        text: 'He\'s searching his coat pockets. Again. Again.',
        delay: 2200,
      },
      {
        text: 'The soldier watching him has begun to step forward.',
        delay: 2000,
      },
    ],
    choices: [
      {
        id: 'create-distraction',
        text: 'Drop your bag. Make noise. Give him a moment.',
        subtext: 'It may do nothing. It may make things worse for you.',
        consequence: {
          nextScene: 'act2-papers',
          flagChanges: { helpedStranger: true },
          trustDeltas: { marta: 0.1 },
          riskDelta: 18,
          emotionalState: 'fearful',
        },
      },
      {
        id: 'look-away',
        text: 'Look straight ahead. Breathe. Your turn will come.',
        subtext: 'Intervention draws attention. Attention is dangerous.',
        consequence: {
          nextScene: 'act2-papers',
          riskDelta: 0,
          emotionalState: 'uncertain',
        },
      },
    ],
  },

  {
    id: 'act2-papers',
    background: 'checkpoint',
    tension: 'critical',
    ambientAudio: 'ambient-checkpoint',
    narrator: [
      {
        text: 'Your turn.',
        delay: 1200,
      },
      {
        text: 'The soldier is young — late twenties. Grey-blue eyes that move over everything without expression.',
        delay: 2800,
      },
      {
        text: 'He takes your papers without looking at you first.',
        delay: 2000,
      },
    ],
    npcId: 'werner',
    staticDialogue: [
      {
        speaker: 'npc',
        text: 'Name.',
        emotion: 'cold',
      },
      {
        speaker: 'npc',
        text: 'Where are you going.',
        emotion: 'cold',
      },
      {
        speaker: 'npc',
        text: 'Where do you live. Exactly.',
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'answer-truthfully',
        text: 'Answer directly. Everything is in order.',
        consequence: {
          nextScene: 'act3-bookshop',
          riskDelta: 0,
          emotionalState: 'uncertain',
        },
      },
      {
        id: 'answer-partially',
        text: 'Answer, but omit the attic. Omit everything that matters.',
        subtext: 'Technically true. Strategically incomplete.',
        consequence: {
          nextScene: 'act3-bookshop',
          flagChanges: { liedAtCheckpoint: true },
          riskDelta: 5,
          emotionalState: 'fearful',
        },
      },
    ],
  },
]

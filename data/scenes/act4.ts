import type { Scene } from '@/types/narrative'

export const act4Scenes: Scene[] = [
  {
    id: 'act4-preparation',
    actTitle: 'Act IV — The Night',
    background: 'apartment-hallway',
    tension: 'high',
    ambientAudio: 'ambient-room',
    narrator: [
      {
        text: 'Evening. The curfew is at nine.',
        delay: 1800,
      },
      {
        text: 'A note was slipped under your door this afternoon. No name. An address on Jordaan. A time: eleven.',
        delay: 3000,
      },
      {
        text: 'You read it twice and burned it.',
        delay: 2000,
      },
      {
        text: 'If you go — if you bring her — there\'s no version of this that isn\'t dangerous.',
        delay: 2800,
      },
      {
        text: 'The alternative is: she stays in the attic until she is found.',
        delay: 2400,
      },
    ],
    choices: [
      {
        id: 'go-with-elsa',
        text: 'Go. Bring her.',
        requiresFlag: 'elsaKnown',
        requiresFlagValue: true,
        consequence: {
          nextScene: 'act4-street',
          flagChanges: { documentsForged: true, documentQuality: 'good' },
          emotionalState: 'resolved',
          riskDelta: 10,
        },
      },
      {
        id: 'go-alone-first',
        text: 'Go alone first. See what\'s there.',
        consequence: {
          nextScene: 'act4-street',
          flagChanges: { documentsForged: true, documentQuality: 'adequate' },
          emotionalState: 'uncertain',
          riskDelta: 5,
        },
      },
      {
        id: 'stay-safe',
        text: 'Don\'t go. This isn\'t your fight.',
        consequence: {
          nextScene: 'act4-street',
          flagChanges: { documentQuality: 'poor' },
          riskDelta: -5,
          emotionalState: 'uncertain',
        },
      },
    ],
  },

  {
    id: 'act4-street',
    background: 'night-street',
    tension: 'critical',
    ambientAudio: 'ambient-night',
    narrator: [
      {
        text: 'Eleven-fifteen. The streets are empty.',
        delay: 1800,
      },
      {
        text: 'She walks close behind you. Her breathing is controlled. She has done this in her mind a hundred times.',
        delay: 3200,
      },
      {
        text: 'Every doorway is a decision. Every sound is a choice.',
        delay: 2400,
      },
      {
        text: 'The canal is a stripe of black water on your left. The safe house is four streets away.',
        delay: 3000,
      },
      {
        text: 'You hear footsteps ahead. Two soldiers, coming your way.',
        delay: 2600,
      },
    ],
    choices: [
      {
        id: 'take-alley',
        text: 'Pull into the alley. Wait until they pass.',
        consequence: {
          nextScene: 'act4-final-checkpoint',
          riskDelta: -5,
          emotionalState: 'fearful',
        },
      },
      {
        id: 'keep-walking',
        text: 'Keep walking. Act like you belong on this street.',
        subtext: 'Panic is more conspicuous than calm.',
        consequence: {
          nextScene: 'act4-final-checkpoint',
          riskDelta: 8,
          emotionalState: 'resolved',
        },
      },
    ],
  },

  {
    id: 'act4-final-checkpoint',
    background: 'checkpoint',
    tension: 'critical',
    ambientAudio: 'ambient-checkpoint',
    narrator: [
      {
        text: 'The safe house is one street away.',
        delay: 1600,
      },
      {
        text: 'There shouldn\'t be a checkpoint here. There wasn\'t one this morning.',
        delay: 2600,
      },
      {
        text: 'Two soldiers. A torch. Moving towards you.',
        delay: 2200,
      },
      {
        text: 'The papers Jan gave you are in your coat pocket.',
        delay: 2000,
      },
      {
        text: 'You recognize the soldier with the torch.',
        delay: 1800,
      },
      {
        text: 'Werner.',
        delay: 1200,
      },
    ],
    npcId: 'werner',
    useAIDialogue: false,
    staticDialogue: [
      {
        speaker: 'npc',
        text: 'Stop. Papers. Both of you.',
        emotion: 'cold',
      },
    ],
    choices: [
      {
        id: 'present-papers',
        text: 'Present the papers calmly.',
        subtext: 'They are forged. Whether Werner notices depends on things you cannot control.',
        consequence: {
          nextScene: 'outcome-a',
          flagChanges: { elsaSafe: true },
          riskDelta: 0,
          emotionalState: 'resolved',
        },
      },
      {
        id: 'create-scene',
        text: 'Create a distraction. Buy her three seconds to run.',
        subtext: 'If she runs, she may reach the safe house. You almost certainly won\'t.',
        consequence: {
          nextScene: 'outcome-b',
          flagChanges: { elsaSafe: true, playerCompromised: true },
          riskDelta: 40,
          emotionalState: 'desperate',
        },
      },
      {
        id: 'claim-relative',
        text: '"She\'s my cousin. She was visiting. I\'m walking her home."',
        consequence: {
          nextScene: 'outcome-a',
          flagChanges: { liedAtCheckpoint: true },
          riskDelta: 20,
          emotionalState: 'fearful',
        },
      },
    ],
  },
]

import type { Scene } from '@/types/narrative'

export const act1Scenes: Scene[] = [
  {
    id: 'act1-building',
    actTitle: 'Act I — The Building',
    background: 'apartment-hallway',
    tension: 'low',
    ambientAudio: 'ambient-room',
    narrator: [
      {
        text: 'Your apartment building. Corner of Prinsengracht and Westermarkt.',
        delay: 2000,
      },
      {
        text: 'Third floor. The smell of ersatz coffee and damp wool.',
        delay: 2200,
      },
      {
        text: 'Mrs. de Vries is already in the hallway when you open your door.',
        delay: 2000,
      },
    ],
    npcId: 'mrs_devries',
    staticDialogue: [
      {
        speaker: 'npc',
        text: 'Good morning. Did you sleep? I didn\'t sleep. The patrols were out past midnight — you could hear them on the canal bridge.',
        emotion: 'neutral',
      },
      {
        speaker: 'npc',
        text: 'The butcher on Rozengracht has nothing again. Nothing. Only the ration card people, and even then...',
        emotion: 'neutral',
      },
      {
        speaker: 'npc',
        text: 'I heard something last night, above us. The attic. Three times. I thought — well, I thought it was rats. But it wasn\'t the sound of rats.',
        emotion: 'careful',
      },
    ],
    choices: [
      {
        id: 'investigate-attic',
        text: 'Go upstairs and check the attic',
        subtext: 'The sound keeps coming back to you.',
        consequence: {
          nextScene: 'act1-attic',
          riskDelta: 5,
          emotionalState: 'uncertain',
        },
      },
      {
        id: 'ignore-sound',
        text: 'Say nothing. Go about your morning.',
        subtext: 'If there\'s something up there, it\'s better you don\'t know.',
        consequence: {
          nextScene: 'act2-checkpoint',
          emotionalState: 'uncertain',
        },
      },
    ],
  },

  {
    id: 'act1-attic',
    background: 'apartment-attic',
    tension: 'medium',
    ambientAudio: 'ambient-room',
    narrator: [
      {
        text: 'The attic door at the top of the staircase.',
        delay: 1600,
      },
      {
        text: 'You knock softly. Once. Twice.',
        delay: 1800,
      },
      {
        text: 'Silence.',
        delay: 1400,
      },
      {
        text: 'Then — movement. Slow, careful movement.',
        delay: 1800,
      },
      {
        text: 'The door opens a few centimeters.',
        delay: 1600,
      },
      {
        text: 'A woman\'s eyes. Dark. Exhausted. Terrified.',
        delay: 2000,
      },
    ],
    npcId: 'elsa',
    useAIDialogue: true,
    staticDialogue: [
      {
        speaker: 'npc',
        text: 'Please. I\'m not — I won\'t make any noise. I promise. I just need a few more days.',
        emotion: 'fearful',
      },
      {
        speaker: 'npc',
        text: 'My name is Elsa. Elsa Hartman. I was with my brother but we got separated near the Waterlooplein. That was three weeks ago.',
        emotion: 'urgent',
      },
      {
        speaker: 'npc',
        text: 'I don\'t know if he\'s — I don\'t know anything anymore.',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'promise-help',
        text: '"I won\'t say anything. And I\'ll bring you food when I can."',
        consequence: {
          nextScene: 'act2-checkpoint',
          flagChanges: { elsaKnown: true },
          trustDeltas: { elsa: 0.4 },
          riskDelta: 10,
          emotionalState: 'resolved',
        },
      },
      {
        id: 'leave-quietly',
        text: 'Say nothing. Close the door. Walk back downstairs.',
        subtext: 'You will not betray her. But you cannot promise anything.',
        consequence: {
          nextScene: 'act2-checkpoint',
          flagChanges: { elsaKnown: true },
          trustDeltas: { elsa: 0.1 },
          riskDelta: 3,
          emotionalState: 'uncertain',
        },
      },
      {
        id: 'ask-who-she-is',
        text: '"Who are you? How long have you been up here?"',
        consequence: {
          nextScene: 'act2-checkpoint',
          flagChanges: { elsaKnown: true },
          trustDeltas: { elsa: 0.25 },
          riskDelta: 7,
          emotionalState: 'uncertain',
        },
      },
    ],
  },
]

import type { Scene } from '@/types/narrative'

export const act3Scenes: Scene[] = [
  {
    id: 'act3-bookshop',
    actTitle: 'Act III — The Bookshop',
    background: 'bookshop',
    tension: 'medium',
    ambientAudio: 'ambient-street',
    narrator: [
      {
        text: 'Van den Berg Antiquarian Books. Keizersgracht, near the church.',
        delay: 2000,
      },
      {
        text: 'A neighbor mentioned it once. They did not say why.',
        delay: 2000,
      },
      {
        text: 'The smell of old paper. A bell above the door.',
        delay: 1800,
      },
      {
        text: 'A woman behind the counter. Silver in her hair. Reading glasses on a chain.',
        delay: 2400,
      },
      {
        text: 'She looks up.',
        delay: 1200,
      },
    ],
    npcId: 'marta',
    staticDialogue: [
      {
        speaker: 'npc',
        text: 'Good afternoon. Are you looking for something in particular?',
        emotion: 'neutral',
      },
    ],
    choices: [
      {
        id: 'coded-phrase',
        text: '"I was hoping you might have something by J.P. Hartmann."',
        subtext: 'A name you heard once. You\'re not sure what it means.',
        consequence: {
          nextScene: 'act3-resistance',
          trustDeltas: { marta: 0.5 },
          flagChanges: { contactedResistance: true },
          emotionalState: 'resolved',
        },
      },
      {
        id: 'just-browsing',
        text: '"Just looking. I heard you had good stock."',
        consequence: {
          nextScene: 'act3-no-contact',
          trustDeltas: { marta: 0.05 },
        },
      },
      {
        id: 'ask-directly',
        text: '"I need help. I\'ve heard there are people who help — people who\'ve been... displaced."',
        subtext: 'Too direct. You know it as you say it.',
        consequence: {
          nextScene: 'act3-no-contact',
          trustDeltas: { marta: -0.2 },
          riskDelta: 12,
          emotionalState: 'fearful',
        },
      },
    ],
  },

  {
    id: 'act3-resistance',
    background: 'bookshop',
    tension: 'medium',
    ambientAudio: 'ambient-street',
    narrator: [
      {
        text: 'Something shifts in her expression. Almost nothing. But something.',
        delay: 2200,
      },
      {
        text: 'She comes around the counter. Locks the front door. Turns the sign to Closed.',
        delay: 2800,
      },
    ],
    npcId: 'marta',
    useAIDialogue: true,
    choices: [
      {
        id: 'tell-about-elsa',
        text: 'Tell her about the woman in the attic.',
        requiresFlag: 'elsaKnown',
        requiresFlagValue: true,
        consequence: {
          nextScene: 'act4-preparation',
          trustDeltas: { marta: 0.2, jan: 0.2 },
          flagChanges: { resistanceKnowsPlayer: true },
          emotionalState: 'resolved',
        },
      },
      {
        id: 'ask-what-they-do',
        text: '"What is it that you do, exactly?"',
        consequence: {
          nextScene: 'act4-preparation',
          trustDeltas: { marta: 0.1 },
          flagChanges: { contactedResistance: true, resistanceKnowsPlayer: true },
        },
      },
    ],
  },

  {
    id: 'act3-no-contact',
    background: 'bookshop',
    tension: 'low',
    ambientAudio: 'ambient-street',
    narrator: [
      {
        text: 'She shows you a few volumes. Polite. Unremarkable.',
        delay: 2000,
      },
      {
        text: 'You buy a small book of Dutch poetry. Something to carry.',
        delay: 2000,
      },
      {
        text: 'Outside, the afternoon light is grey and flat.',
        delay: 1800,
      },
      {
        text: 'You do not know what you didn\'t find there.',
        delay: 2200,
      },
    ],
    defaultNext: 'act4-preparation',
  },
]

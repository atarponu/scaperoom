import type { Scene } from '@/types/narrative'

export const identitySetupScene: Scene = {
  id: 'identity-setup',
  background: 'apartment-hallway',
  tension: 'low',
  ambientAudio: 'ambient-room',
  narrator: [
    {
      text: 'Before we begin — who are you?',
      delay: 1200,
    },
    {
      text: 'Your identity will shape how others see you, what risks you carry, what you understand.',
      delay: 2200,
    },
  ],
  choices: [
    {
      id: 'dutch-civilian',
      text: 'Dutch — born in Amsterdam',
      subtext:
        'You have lived here your whole life. You know every street, every neighbor. This city is yours — but it no longer feels like it.',
      consequence: {
        nextScene: 'act1-building',
        flagChanges: {},
        emotionalState: 'uncertain',
      },
    },
    {
      id: 'polish-civilian',
      text: 'Polish — came before the war for work',
      subtext:
        'You came to Amsterdam in 1937. You have fewer connections here, but you speak Dutch well enough. You know what occupation looks like from Poland — you knew it was coming here too.',
      consequence: {
        nextScene: 'act1-building',
        flagChanges: {},
        emotionalState: 'uncertain',
      },
    },
    {
      id: 'french-civilian',
      text: 'French — refugee from Paris',
      subtext:
        'You fled Paris in 1940 when the Germans entered. Amsterdam felt safer. It was not. Now you carry papers that mark you as foreign — an extra layer of risk at every checkpoint.',
      consequence: {
        nextScene: 'act1-building',
        flagChanges: {},
        riskDelta: 8,
        emotionalState: 'fearful',
      },
    },
  ],
}

import type { Scene } from '@/types/narrative'

export const epilogueScene: Scene = {
  id: 'epilogue',
  background: 'museum',
  tension: 'none',
  ambientAudio: 'silence',
  narrator: [
    {
      text: 'What you have just experienced is a work of narrative fiction, grounded in historical fact.',
      delay: 3000,
    },
    {
      text: 'The occupation of the Netherlands began on May 10, 1940.',
      delay: 2800,
    },
    {
      text: 'Of approximately 140,000 Jewish people living in the Netherlands at the start of the occupation, between 101,000 and 104,000 were murdered — the highest percentage of any occupied Western European country.',
      delay: 6000,
    },
    {
      text: 'An estimated 25,000 to 27,000 Jewish people survived in hiding. This was made possible by networks of ordinary citizens who chose to help.',
      delay: 5000,
    },
    {
      text: 'Many of those helpers were arrested. Many did not survive the war.',
      delay: 3400,
    },
    {
      text: 'The Dutch resistance organized strikes, forged documents, hid people, and transmitted intelligence — at enormous personal cost.',
      delay: 4400,
    },
    {
      text: 'These are not stories of heroes. They are stories of human beings faced with choices that should never have existed.',
      delay: 4200,
    },
    {
      text: 'The choices you made in this experience reflect a fraction of the impossible weight that ordinary people carried every day under occupation.',
      delay: 4600,
    },
    {
      text: 'There is no correct answer. There was no correct answer.',
      delay: 3200,
    },
    {
      text: 'Remember them.',
      delay: 2000,
    },
  ],
  defaultNext: 'credits',
}

export const creditsScene: Scene = {
  id: 'credits',
  background: 'black',
  tension: 'none',
  ambientAudio: 'silence',
  narrator: [],
  defaultNext: undefined,
}

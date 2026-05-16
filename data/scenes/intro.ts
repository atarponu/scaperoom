import type { Scene } from '@/types/narrative'

export const introScene: Scene = {
  id: 'intro',
  background: 'black',
  tension: 'none',
  ambientAudio: 'silence',
  autoAdvanceMs: undefined,
  narrator: [
    {
      text: 'Amsterdam.',
      delay: 1200,
    },
    {
      text: 'November, 1942.',
      delay: 1400,
    },
    {
      text: 'The city breathes differently now.',
      delay: 1800,
    },
    {
      text: 'Carefully. Quietly. Always listening.',
      delay: 2000,
    },
    {
      text: 'German forces have occupied the Netherlands for two and a half years. Ration books. Curfews. Yellow stars sewn onto coats.',
      delay: 3000,
    },
    {
      text: 'The systematic removal of neighbors.',
      delay: 2400,
    },
    {
      text: 'Of the 140,000 Jewish citizens of the Netherlands at the start of the occupation, more than 100,000 will not survive the war.',
      delay: 4000,
    },
    {
      text: 'This is not a story about heroes.',
      delay: 2200,
    },
    {
      text: 'It is a story about ordinary people in impossible circumstances.',
      delay: 2800,
    },
    {
      text: 'About the cost of looking away.',
      delay: 2200,
    },
    {
      text: 'And the cost of not looking away.',
      delay: 2400,
    },
  ],
  defaultNext: 'identity-setup',
}

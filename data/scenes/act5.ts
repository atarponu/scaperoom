import type { Scene } from '@/types/narrative'

export const act5Scenes: Scene[] = [
  {
    id: 'outcome-a',
    actTitle: 'Act V',
    background: 'safe-house',
    tension: 'low',
    ambientAudio: 'ambient-room',
    narrator: [
      {
        text: 'Werner looks at the papers. Looks at her. Looks at you.',
        delay: 2400,
      },
      {
        text: 'A moment that lasts longer than a moment.',
        delay: 2000,
      },
      {
        text: 'He hands the papers back.',
        delay: 1800,
      },
      {
        text: '"Move along."',
        delay: 1400,
      },
      {
        text: 'The safe house door opens before you even knock.',
        delay: 2200,
      },
      {
        text: 'Jan takes her arm. Leads her inside. Does not speak.',
        delay: 2200,
      },
      {
        text: 'She looks back at you once.',
        delay: 1800,
      },
      {
        text: 'That is all.',
        delay: 1400,
      },
      {
        text: 'You walk home alone through streets that are still occupied, still dangerous, still wrong.',
        delay: 3200,
      },
      {
        text: 'But she is inside. She is safe — for tonight.',
        delay: 2600,
      },
      {
        text: 'In this war, tonight is enough.',
        delay: 2200,
      },
    ],
    defaultNext: 'epilogue',
  },

  {
    id: 'outcome-b',
    background: 'night-canal',
    tension: 'medium',
    ambientAudio: 'tension-drone',
    narrator: [
      {
        text: 'You step forward. Drop your bag. Say something loud and confused about directions.',
        delay: 3000,
      },
      {
        text: 'Werner looks at you. Behind you, in the darkness — movement.',
        delay: 2600,
      },
      {
        text: 'She ran.',
        delay: 1400,
      },
      {
        text: 'Werner does not chase. He examines your papers slowly. Too slowly.',
        delay: 2800,
      },
      {
        text: 'He marks something in his notebook.',
        delay: 1800,
      },
      {
        text: '"Your address."',
        delay: 1400,
      },
      {
        text: 'He has your name. He has your address.',
        delay: 2200,
      },
      {
        text: 'Three days later you learn she reached the safe house.',
        delay: 2400,
      },
      {
        text: 'Three weeks later, a knock comes at your door before dawn.',
        delay: 2600,
      },
      {
        text: 'Whether it was for this, or something else, or nothing at all — you do not know.',
        delay: 3000,
      },
    ],
    defaultNext: 'epilogue',
  },

  {
    id: 'outcome-c',
    background: 'ruins',
    tension: 'high',
    ambientAudio: 'tension-drone',
    narrator: [
      {
        text: 'The papers are wrong. Werner sees it immediately.',
        delay: 2400,
      },
      {
        text: 'The date. The stamp. Something small that a printer in a basement couldn\'t replicate perfectly enough.',
        delay: 3200,
      },
      {
        text: 'He calls for backup without raising his voice.',
        delay: 2200,
      },
      {
        text: 'You are told not to move.',
        delay: 1600,
      },
      {
        text: 'You do not move.',
        delay: 1400,
      },
      {
        text: 'You watch her face as they take her arm.',
        delay: 2400,
      },
      {
        text: 'She does not look at you. She knew this was always the more likely outcome.',
        delay: 3000,
      },
      {
        text: 'They let you go — your papers were correct. You were just a witness to someone else\'s crime.',
        delay: 3200,
      },
      {
        text: 'That is what they call it.',
        delay: 1800,
      },
    ],
    defaultNext: 'epilogue',
  },

  {
    id: 'outcome-d',
    background: 'safe-house',
    tension: 'medium',
    ambientAudio: 'tension-drone',
    narrator: [
      {
        text: 'She reaches the safe house.',
        delay: 1800,
      },
      {
        text: 'You reach your building.',
        delay: 1600,
      },
      {
        text: 'In the morning, word comes through Marta\'s network.',
        delay: 2400,
      },
      {
        text: 'Jan was arrested at four in the morning.',
        delay: 2200,
      },
      {
        text: 'A neighbor\'s report. Or an informant. Or a patrol that got lucky.',
        delay: 2800,
      },
      {
        text: 'The network holds. Others take over. This is how it works — it has to keep working.',
        delay: 3200,
      },
      {
        text: 'Elsa is alive.',
        delay: 1600,
      },
      {
        text: 'Jan is not.',
        delay: 1600,
      },
      {
        text: 'These two facts sit side by side and cannot be reconciled.',
        delay: 2800,
      },
    ],
    defaultNext: 'epilogue',
  },

  {
    id: 'outcome-e',
    background: 'night-street',
    tension: 'low',
    ambientAudio: 'tension-drone',
    narrator: [
      {
        text: 'You never knew her name.',
        delay: 2000,
      },
      {
        text: 'You heard a sound in an attic, and you chose not to know.',
        delay: 2800,
      },
      {
        text: 'There are reasons for this. Fear. Caution. Self-preservation.',
        delay: 3000,
      },
      {
        text: 'All understandable. All true.',
        delay: 2000,
      },
      {
        text: 'Sometime in December, the attic above you was found empty. You don\'t know if she was moved, caught, or died there.',
        delay: 4000,
      },
      {
        text: 'This is also part of the history.',
        delay: 2200,
      },
      {
        text: 'The things that went unknowing.',
        delay: 2000,
      },
    ],
    defaultNext: 'epilogue',
  },
]

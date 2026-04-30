const finalTiles = [
  { id: 'il', label: 'il' },
  { id: 'al', label: 'al' },
  { id: 'derbe', label: 'derbe' },
  { id: '-uk', label: '-uk' },
  { id: 'ya-', label: 'ya-' },
  { id: 'ramde', label: 'ramde' },
  { id: 'puacarda', label: 'puacarda' },
  { id: 'dodarom', label: 'dodarom' },
  { id: 'kume', label: 'kume' },
  { id: 'gane', label: 'gane' },
];

export const stage4 = {
  id: 'stage4',
  name: 'Stage 4 - Bridge',
  room: 'commsRoom',

  introNarration: {
    type: 'narration',
    title: 'The Bridge',
    lines: [
      'The alien commander raises both hands, cautious but not hostile.',
      'The ship is ready. The medicine is ready. Now I have to make myself understood.',
    ],
  },

  commanderConversation: {
    type: 'conversation',
    title: 'Commander Channel',
    instructions:
      'Build each response from your known BLAH words. The commander will only act when the meaning is clear.',
    steps: [
      {
        alien: 'al... op-derbe?',
        prompt: 'Prove that you are cured.',
        slotCount: 3,
        availableTiles: finalTiles,
        correctSequence: ['il', 'derbe', '-uk'],
        reply: 'derbe-uk. Verified.',
        successMessage: 'The medic scanner confirms your treatment.',
      },
      {
        alien: 'dodarom junke? dodarom op-derbe?',
        prompt: 'Say that you will return/fly again and heal Earth.',
        slotCount: 5,
        availableTiles: finalTiles,
        correctSequence: ['il', 'ya-', 'ramde', 'derbe', 'dodarom'],
        reply: 'dodarom derbe. Understood.',
        successMessage: 'The commander understands Earth needs healing.',
      },
      {
        alien: 'puacarda ramde?',
        prompt: 'Ask the commander to fly the medicine to Earth.',
        slotCount: 4,
        availableTiles: finalTiles,
        correctSequence: ['al', 'ramde', 'puacarda', 'dodarom'],
        reply: 'ya-derbe dodarom.',
        successMessage: 'The commander salutes and orders the cargo loaded.',
      },
    ],
    objective: 'stage4-complete',
    afterSolve: {
      type: 'narration',
      title: 'Homeward',
      lines: [
        'The cargo ship lifts from Planet 999 with puacarda secured for Earth.',
        'BLAH was never random. op- worked like un-, ya- worked like re-, and -uk worked like -ed.',
        'Every strange word was built from meaningful parts. You learned morphology by surviving it.',
      ],
    },
  },
};

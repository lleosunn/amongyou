const finalTiles = [
  { id: 'il', label: 'il' },
  { id: 'al', label: 'al' },
  { id: 'derbe', label: 'derbe' },
  { id: '-uk', label: '-uk' },
  { id: 'ya-', label: 'ya-' },
  { id: 'ramde', label: 'ramde' },
  { id: 'pua-', label: 'pua-' },
  { id: 'carda', label: 'carda' },
  { id: 'doda', label: 'doda' },
  { id: 'rom', label: 'rom' },
  { id: 'kume', label: 'kume' },
  { id: 'gane', label: 'gane' },
];

const pickFinalTiles = (...ids) =>
  ids.map((id) => finalTiles.find((tile) => tile.id === id));

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
      'Build each response from your known alien-language word parts. The commander will only act when the meaning is clear.',
    steps: [
      {
        alien: 'al derbe-uk?',
        prompt: 'Say: I am healed.',
        sceneImageKey: 'clueBridgeScanner',
        sceneTitle: 'Medical Scanner',
        sceneCaption: 'The bridge scanner checks that your treatment is complete.',
        slotCount: 3,
        availableTiles: pickFinalTiles('al', '-uk', 'il', 'derbe'),
        correctSequence: ['il', 'derbe', '-uk'],
        reply: 'derbe-uk.',
        wrongMessage:
          'The scanner needs who is healed, the healing root, and the completed ending.',
        hintAfterAttempts: 2,
        attemptHint: 'Hint: build "I am healed"',
        successMessage: 'The medic scanner accepts your healed status.',
      },
      {
        alien: 'doda rom derbe?',
        prompt:
          'Answer the mission idea: I am flying to Earth so Earth can be healed.',
        sceneImageKey: 'clueBridgeRoute',
        sceneTitle: 'Earth Route',
        sceneCaption: 'The route panel shows Earth and the loaded medicine.',
        slotCount: 5,
        availableTiles: pickFinalTiles(
          'doda',
          'ramde',
          'al',
          'rom',
          'il',
          'derbe'
        ),
        correctSequence: ['il', 'ramde', 'derbe', 'doda', 'rom'],
        reply: 'doda rom derbe.',
        wrongMessage:
          'The commander still needs the mission idea: who is going, what action, and which planet needs healing.',
        hintAfterAttempts: 2,
        attemptHint: 'Hint: build "I fly/go heal Earth"',
        successMessage: 'The commander understands Earth needs healing.',
      },
      {
        alien: 'puacarda ramde?',
        prompt: 'Say: You fly the antiviral medicine to Earth.',
        sceneImageKey: 'clueBridgeTransport',
        sceneTitle: 'Transport Request',
        sceneCaption: 'The commander studies the cargo ship route.',
        slotCount: 6,
        availableTiles: pickFinalTiles(
          'carda',
          'rom',
          'il',
          'doda',
          'pua-',
          'al',
          'ramde'
        ),
        correctSequence: ['al', 'ramde', 'pua-', 'carda', 'doda', 'rom'],
        reply: 'ya-derbe doda rom.',
        wrongMessage:
          'Start with who flies, then name the medicine, then name the destination.',
        hintAfterAttempts: 2,
        attemptHint: 'Hint: build "you fly puacarda Earth"',
        successMessage: 'The commander salutes and orders the cargo loaded.',
      },
    ],
    objective: 'stage4-complete',
    afterSolve: {
      type: 'narration',
      title: 'Homeward',
      lines: [
        'The cargo ship lifts from Planet 999 with puacarda secured for Earth.',
        'The alien language was never random. op- worked like un-, ya- worked like re-, and -uk worked like -ed.',
        'Every strange word was built from meaningful parts. You learned morphology by surviving it.',
      ],
    },
  },
};

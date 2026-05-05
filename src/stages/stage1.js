const prefixTiles = [
  { id: 'op-', label: 'op-' },
  { id: 'a-', label: 'a-' },
  { id: 'ya-', label: 'ya-' },
  { id: 'me-', label: 'me-' },
  { id: 'gane', label: 'gane' },
];

export const stage1 = {
  id: 'stage1',
  name: "Stage 1 - Pilot's Cabin",
  room: 'pilotCabin',

  introNarration: {
    type: 'narration',
    title: 'Waking up...',
    lines: [
      'Ouch. My head hurts. Where am I?',
      'I see metal walls, strange technology, and stars outside the window. It seems I am on an alien spaceship.',
      'There is a message in my pocket. I must have carried it from Earth: "We are all counting on you to bring home the antiviral medicine to cure zadotitis."',
      'All the writing in this spaceship is in an unfamiliar language. I need to learn enough words to find the cure, then tell the aliens I need to go back to Earth.',
      'Time to gather some clues from the words around me.',
    ],
  },

  chatChoice: {
    type: 'choice',
    title: 'Message Screen',
    instructions: 'Use the visual clue to infer the alien word.',
    body: 'ALIEN: al\n\nThe alien avatar waves and points toward you.',
    question: 'What might "al" mean?',
    options: [
      { id: 'il', label: 'I / me' },
      { id: 'al', label: 'you' },
      { id: 'kume', label: 'hello' },
      { id: 'derbe', label: 'help' },
    ],
    correctOptionId: 'al',
    correctMessage: 'The alien is talking to you.',
    morphemesLearned: ['al'],
    objective: 'pilot-chat',
  },

  planetChoice: {
    type: 'choice',
    title: 'Planet Posters',
    instructions: 'The same ending appears on both labels.',
    body: 'fannarom\n\n   desarom\n\nTwo different worlds. One shared ending: rom.',
    question: 'What does "rom" probably mean?',
    options: [
      { id: 'star', label: 'star' },
      { id: 'planet', label: 'planet' },
      { id: 'red', label: 'red' },
      { id: 'big', label: 'big' },
    ],
    correctOptionId: 'planet',
    morphemesLearned: ['rom'],
    objective: 'pilot-planets',
  },

  rosterChoice: {
    type: 'choice',
    title: 'Crew Roster',
    instructions: 'Decode the job labels from uniforms and repeated word parts.',
    steps: [
      {
        body: 'ramdenu     derbenu\n\nBoth crew titles end with nu.',
        question: 'What does "-nu" seem to mark?',
        options: [
          { id: 'person', label: 'person / doer' },
          { id: 'place', label: 'place' },
          { id: 'thing', label: 'thing' },
          { id: 'past', label: 'past action' },
        ],
        correctOptionId: 'person',
      },
      {
        body: 'ramdenu\n\nThe crewmate wears a flight helmet and stands beside a ship diagram.',
        question: 'What does "ramde" probably mean?',
        options: [
          { id: 'cure', label: 'cure / heal' },
          { id: 'fly', label: 'fly / go' },
          { id: 'lock', label: 'lock' },
          { id: 'fill', label: 'fill' },
        ],
        correctOptionId: 'fly',
      },
      {
        body: 'derbenu\n\nThe crewmate wears a medical coat and holds a scanner.',
        question: 'What does "derbe" probably mean?',
        options: [
          { id: 'cure', label: 'cure / heal' },
          { id: 'fly', label: 'fly / go' },
          { id: 'planet', label: 'planet' },
          { id: 'water', label: 'water' },
        ],
        correctOptionId: 'cure',
      },
    ],
    morphemesLearned: ['-nu', 'ramde', 'derbe', 'ramdenu', 'derbenu'],
    objective: 'pilot-roster',
  },

  dispenserChoice: {
    type: 'experiment',
    title: 'Liquid Dispenser',
    instructions:
      'Press the alien-labeled buttons and watch what each one dispenses.',
    samples: [
      {
        id: 'tito',
        label: 'tito',
        result: 'A purple slush pours into the cup.',
        color: '#8f4dff',
      },
      {
        id: 'bibi',
        label: 'bibi',
        result: 'A thick green liquid drips out.',
        color: '#70d86c',
      },
      {
        id: 'doda',
        label: 'doda',
        result: 'Clear water fills the cup.',
        color: '#7ec7ff',
      },
    ],
    correctSampleId: 'doda',
    successMessage: 'doda dispenses water.',
    morphemesLearned: ['doda'],
    objective: 'pilot-dispenser',
  },

  bedLabelCheck: {
    type: 'translation-check',
    title: 'Bed Label',
    instructions:
      'The label is visible right away. Come back once enough word parts are readable.',
    labelLines: ['al: rom?', 'puacarda x 2'],
    requiredMorphemes: ['al', 'rom'],
    prompt: 'What do you think the first line means?',
    placeholder: 'Example: you planet',
    lockedMessage:
      'The label matters, but the words are still just marks. Look around for al and rom, then check it again.',
    readyMessage:
      'You know the key word parts now. Try translating the first line yourself.',
    wrongMessage:
      'Not quite. Use the two word parts you have learned from the message screen and the planet posters.',
    successMessage:
      'Yes. It reads like "you: planet?" The aliens were trying to identify where you came from. puacarda is still unresolved.',
    acceptedKeywordGroups: [
      ['you', 'your'],
      ['planet', 'world'],
    ],
    morphemesLearned: ['puacardaSeen'],
    objective: 'pilot-bed-label',
  },

  doorBuilder: {
    type: 'builder',
    title: 'Cabin Door Lock',
    instructions:
      'The door shows a lock symbol and the word "gane". Build the word that reverses the lock.',
    prompt: 'Door display: [ ___ ] + [ gane ]',
    slotCount: 2,
    availableTiles: prefixTiles,
    correctSequence: ['op-', 'gane'],
    wrongMessage: 'The lock clicks, then resets.',
    successMessage: 'The lock turns green. opgane: unlock.',
    morphemesLearned: ['gane', 'op-', 'opgane'],
    objective: 'stage1-complete',
    afterSolve: {
      type: 'narration',
      title: 'The Door Opens',
      lines: [
        'op- reverses. gane is lock. opgane is unlock.',
        'The Clinic is open now. If puacarda is medicine, I need to find it fast.',
      ],
    },
  },
};

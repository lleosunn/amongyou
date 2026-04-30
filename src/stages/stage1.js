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
      'Metal walls. A ship ceiling. My head feels split open.',
      'There is a handwritten card in my pocket: "Bring home the antiviral medicine to cure zadotitis."',
      'I remember alarms, low fuel, a crash, and hands carrying me somewhere safe.',
      'Everything here works, but every label is in BLAH. I need words before I can get home.',
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
          { id: 'cure', label: 'cure' },
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
    type: 'choice',
    title: 'Liquid Dispenser',
    instructions: 'Test the buttons and connect the label to the result.',
    body: 'tito: purple slush\nbibi: green slush\ndoda: clear liquid',
    question: 'The "doda" button made clear water. What does "doda" mean?',
    options: [
      { id: 'juice', label: 'juice' },
      { id: 'water', label: 'water' },
      { id: 'milk', label: 'milk' },
      { id: 'air', label: 'air' },
    ],
    correctOptionId: 'water',
    morphemesLearned: ['doda'],
    objective: 'pilot-dispenser',
  },

  bedLabelClue: {
    type: 'clue',
    title: 'Bed Label',
    body: 'al: rom?\npuacarda x 2',
    note: 'Now some of it is readable: "you: planet?" The aliens did not know where you came from. They have also been giving you something called puacarda.',
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

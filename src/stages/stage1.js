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
    type: 'visual-discovery',
    title: 'Message Screen',
    instructions:
      'Compare the avatar gestures on the message screen. Click the tag aimed at the person in front of the screen.',
    steps: [
      {
        prompt:
          'One tag appears when the avatar taps its chest. The other appears when it points outward. Click the outward-pointing tag.',
        cards: [
          {
            id: 'message-self-card',
            title: 'Screen Tag A',
            visual: 'message-self',
            imageKey: 'messageSelf',
            label: 'il',
            labelParts: [{ id: 'message-self-il', text: 'il' }],
          },
          {
            id: 'message-you-card',
            title: 'Screen Tag B',
            visual: 'message-you',
            imageKey: 'messageYou',
            label: 'al',
            labelParts: [{ id: 'message-you-al', text: 'al' }],
          },
        ],
        correctPartIds: ['message-you-al'],
        wrongMessage:
          'That tag is paired with the avatar pointing to itself. Look for the outward gesture.',
        successMessage:
          'The outward gesture marks the person in front of the screen. al means you.',
      },
    ],
    morphemesLearned: ['al'],
    objective: 'pilot-chat',
  },

  planetDiscovery: {
    type: 'visual-discovery',
    title: 'Planet Posters',
    instructions:
      'Compare the alien labels with the pictures. Click the word part that repeats on both planet posters.',
    steps: [
      {
        prompt:
          'Both posters show worlds, but only one word part is shared. Click the shared part on both labels.',
        cards: [
          {
            id: 'dodarom-poster',
            title: 'Blue Water World',
            caption: 'The poster shows a blue planet with oceans.',
            visual: 'earth',
            imageKey: 'planetDodarom',
            label: 'dodarom',
            labelParts: [
              { id: 'dodarom-doda', text: 'doda' },
              { id: 'dodarom-rom', text: 'rom' },
            ],
          },
          {
            id: 'fannarom-poster',
            title: 'Ringed Amber World',
            caption: 'The poster shows another planet with rings.',
            visual: 'amber',
            imageKey: 'planetFannarom',
            label: 'fannarom',
            labelParts: [
              { id: 'fannarom-fanna', text: 'fanna' },
              { id: 'fannarom-rom', text: 'rom' },
            ],
          },
        ],
        correctPartIds: ['dodarom-rom', 'fannarom-rom'],
        wrongMessage:
          'Look for the part that appears on both labels and matches what both pictures have in common.',
        successMessage:
          'Both pictures are planets, and both labels end with rom. rom means planet.',
      },
    ],
    morphemesLearned: ['rom'],
    objective: 'pilot-planets',
  },

  rosterDiscovery: {
    type: 'visual-discovery',
    title: 'Crew Roster',
    instructions:
      'Use the crew pictures and nameplates to discover the job words.',
    steps: [
      {
        prompt:
          'Both roster entries show crew members with jobs. Click the repeated ending on both nameplates.',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'This crewmate wears a flight helmet beside a route map.',
            visual: 'pilot',
            imageKey: 'crewPilot',
            label: 'ramdenu',
            labelParts: [
              { id: 'pilot-ramde', text: 'ramde' },
              { id: 'pilot-nu', text: 'nu' },
            ],
          },
          {
            id: 'medic-card',
            title: 'Medical Crew',
            caption: 'This crewmate wears a medical coat and holds a scanner.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        correctPartIds: ['pilot-nu', 'medic-nu'],
        wrongMessage:
          'The shared part is the same ending on both crew job labels.',
        successMessage:
          'Both labels end with nu, and both pictures show people with jobs. -nu marks a person or doer.',
      },
      {
        prompt:
          'Now focus on the flight crew picture. Click the part that names the flight action.',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'Helmet, route map, and ship controls point to flying or going.',
            visual: 'pilot',
            imageKey: 'crewPilot',
            label: 'ramdenu',
            labelParts: [
              { id: 'pilot-ramde', text: 'ramde' },
              { id: 'pilot-nu', text: 'nu' },
            ],
          },
          {
            id: 'medic-card',
            title: 'Medical Crew',
            caption: 'The second card is a different job.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        correctPartIds: ['pilot-ramde'],
        wrongMessage:
          'The ending marks the person. The other part on the flight card names the action.',
        successMessage:
          'ramde points to fly or go. ramdenu is a pilot.',
      },
      {
        prompt:
          'Now focus on the medical crew picture. Click the part that names healing.',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'The first card is the flight job.',
            visual: 'pilot',
            imageKey: 'crewPilot',
            label: 'ramdenu',
            labelParts: [
              { id: 'pilot-ramde', text: 'ramde' },
              { id: 'pilot-nu', text: 'nu' },
            ],
          },
          {
            id: 'medic-card',
            title: 'Medical Crew',
            caption: 'Medical coat, scanner, and kit point to healing.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        correctPartIds: ['medic-derbe'],
        wrongMessage:
          'The medical picture points to the root, not the person ending.',
        successMessage:
          'derbe points to healing. derbenu is a doctor or medic.',
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
        result: 'The cup fills.',
        color: '#8f4dff',
      },
      {
        id: 'bibi',
        label: 'bibi',
        result: 'The cup fills.',
        color: '#70d86c',
      },
      {
        id: 'doda',
        label: 'doda',
        result: 'The cup fills.',
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
    placeholder: 'Type your translation',
    lockedMessage:
      'The label matters, but the words are still just marks. Look around for al and rom, then check it again.',
    readyMessage:
      'The first line is readable now. Type what the label is asking.',
    wrongMessage:
      'Not quite. Use the two word parts you have learned from the message screen and the planet posters.',
    successMessage:
      'Yes. It reads like "you: planet?" The aliens were trying to identify where you came from. puacarda is still unresolved.',
    acceptedKeywordGroups: [
      ['you', 'your'],
      ['planet', 'world'],
    ],
    showDecode: false,
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

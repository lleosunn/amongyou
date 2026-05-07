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
      'There is a message in my pocket. I must have carried it from Mars: "We are all counting on you to bring home the antiviral medicine to cure zadotitis."',
      'All of the writing in this spaceship is unfamiliar. How can I communicate to the aliens that I need to return home with a cure?',
      'Time to gather some clues from the words around me.',
    ],
  },

  chatChoice: {
    type: 'visual-discovery',
    title: 'Message Screen',
    instructions:
      'Match the words to what the alien is pointing at.',
    steps: [
      {
        meaningChips: [
          { id: 'i-me', label: 'I / me' },
          { id: 'you', label: 'you' },
        ],
        cards: [
          {
            id: 'message-self-card',
            title: 'il',
            caption: 'The alien taps their chest.',
            visual: 'message-self',
            imageKey: 'messageSelf',
            label: 'il',
            acceptedMeaningId: 'i-me',
          },
          {
            id: 'message-you-card',
            title: 'al',
            caption: 'The alien points outward.',
            visual: 'message-you',
            imageKey: 'messageYou',
            label: 'al',
            acceptedMeaningId: 'you',
          },
        ],
        wrongMessage:
          'That meaning belongs with the other gesture.',
        successMessage:
          'il marks the speaker. al marks the person being addressed.',
      },
    ],
    morphemesLearned: ['il', 'al'],
    objective: 'pilot-chat',
  },

  planetDiscovery: {
    type: 'visual-discovery',
    title: 'Planet Posters',
    instructions:
      'There are two posters of planets. One is red and dusty, and the other has orange bands. What is the root of both words?',
    steps: [
      {
        cards: [
          {
            id: 'desarom-poster',
            title: 'Desa Rom',
            caption: 'The poster shows Mars, a red planet.',
            visual: 'mars',
            imageKey: 'planetDesarom',
            label: 'desa rom',
            labelOnImage: true,
            labelParts: [
              { id: 'desarom-desa', text: 'desa' },
              { id: 'desarom-rom', text: 'rom' },
            ],
          },
          {
            id: 'fannarom-poster',
            title: 'Fanna Rom',
            caption: 'The poster shows Jupiter, an orange planet with bands.',
            visual: 'jupiter',
            imageKey: 'planetFannarom',
            label: 'fanna rom',
            labelOnImage: true,
            labelParts: [
              { id: 'fannarom-fanna', text: 'fanna' },
              { id: 'fannarom-rom', text: 'rom' },
            ],
          },
        ],
        correctPartIds: ['desarom-rom', 'fannarom-rom'],
        wrongMessage:
          'Look for the part that appears on both planet names.',
        successMessage:
          'Both names end with rom. rom means planet.',
      },
    ],
    morphemesLearned: ['rom'],
    objective: 'pilot-planets',
  },

  rosterDiscovery: {
    type: 'visual-discovery',
    title: 'Crew Roster',
    instructions:
      'Read the crew nameplates by matching each part to the picture clue.',
    steps: [
      {
        prompt:
          'Both roster entries show crew members with jobs. Click the repeated ending on both nameplates.',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'A helmet, map, and ship controls are visible in this image.',
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
            caption: 'A medical coat, scanner, and medicine kit are visible in this image.',
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
        prompt: 'Which crewmate is the pilot?',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'A helmet, map, and ship controls are visible in this image.',
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
            caption: 'A medical coat, scanner, and medicine kit are visible in this image.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        correctCardIds: ['pilot-card'],
        wrongMessage:
          'The flight gear points to the pilot, not the medical crew.',
        successMessage:
          'ramde points to fly or go. ramdenu is a pilot.',
      },
      {
        prompt: 'Which crewmate is the medic?',
        cards: [
          {
            id: 'pilot-card',
            title: 'Flight Crew',
            caption: 'A helmet, map, and ship controls are visible in this image.',
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
            caption: 'A medical coat, scanner, and medicine kit are visible in this image.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        correctCardIds: ['medic-card'],
        wrongMessage:
          'The medical tools point to the medic, not the flight crew.',
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
    successDelayMs: 3200,
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
      'The door panel pairs gane with a locked icon and op- with a reversing arrow.',
    prompt: 'Door display: [ ___ ] + [ gane ].',
    clues: [
      {
        id: 'door-prefix-hint',
        title: 'Door Hint',
        caption:
          'gane is lock. The reversing arrow beside op- shows the lock changing state.',
      },
    ],
    slotCount: 2,
    availableTiles: prefixTiles,
    correctSequence: ['op-', 'gane'],
    wrongEffect: 'door-lock',
    wrongMessage:
      'A red light snaps on. The door gives a heavy mechanical thunk and stays locked.',
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

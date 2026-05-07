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
      'There are two posters of planets. One is blue with oceans, and the other has orange bands. What is the root of both words?',
    steps: [
      {
        prompt: 'Click the shared root on both planet labels.',
        cards: [
          {
            id: 'earth-poster',
            title: 'Earth Poster',
            caption: 'The poster shows Earth, a blue ocean planet.',
            visual: 'earth',
            imageKey: 'planetDodarom',
            label: 'doda rom',
            labelAsTitle: true,
            labelParts: [
              { id: 'earth-doda', text: 'doda' },
              { id: 'earth-rom', text: 'rom' },
            ],
          },
          {
            id: 'fannarom-poster',
            title: 'Banded Poster',
            caption: 'The poster shows Jupiter, an orange planet with bands.',
            visual: 'jupiter',
            imageKey: 'planetFannarom',
            label: 'fanna rom',
            labelAsTitle: true,
            labelParts: [
              { id: 'fannarom-fanna', text: 'fanna' },
              { id: 'fannarom-rom', text: 'rom' },
            ],
          },
        ],
        correctPartIds: ['earth-rom', 'fannarom-rom'],
        partialMessage:
          'That part is selected. Click the matching rom on the other poster.',
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
      'Use the nameplates as evidence. Match each role root to the crew image.',
    steps: [
      {
        prompt: 'Drop each root onto the role it names.',
        meaningChips: [
          { id: 'ramde', label: 'ramde' },
          { id: 'derbe', label: 'derbe' },
        ],
        meaningTargetLabel: 'Drop root',
        cards: [
          {
            id: 'pilot-card',
            title: 'Pilot Role',
            caption: 'A helmet, map, and ship controls are visible in this image.',
            visual: 'pilot',
            imageKey: 'crewPilot',
            label: 'ramdenu',
            acceptedMeaningId: 'ramde',
            labelParts: [
              { id: 'pilot-ramde', text: 'ramde' },
              { id: 'pilot-nu', text: 'nu' },
            ],
          },
          {
            id: 'medic-card',
            title: 'Medic Role',
            caption: 'A medical coat, scanner, and medicine kit are visible in this image.',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            acceptedMeaningId: 'derbe',
            labelParts: [
              { id: 'medic-derbe', text: 'derbe' },
              { id: 'medic-nu', text: 'nu' },
            ],
          },
        ],
        wrongMessage:
          'That root belongs with the other crew image.',
        successMessage:
          'ramde points to fly or go. derbe points to healing. Both labels end with nu, so -nu marks a person or doer.',
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
        color: '#8f4dff',
      },
      {
        id: 'bibi',
        label: 'bibi',
        color: '#70d86c',
      },
      {
        id: 'doda',
        label: 'doda',
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
    type: 'visual-discovery',
    title: 'Cabin Door Lock',
    instructions:
      'Use the lock panel image to find the word part that reverses the locked state.',
    steps: [
      {
        prompt:
          'The panel shows a lock becoming unlocked. Click the reversing prefix in the door command.',
        cards: [
          {
            id: 'cabin-door-lock-card',
            title: 'Door Command',
            caption:
              'The cabin display shows the lock state changing into an unlocked state.',
            visual: 'door-lock',
            imageKey: 'clueCabinDoorLock',
            label: 'opgane',
            labelAsTitle: true,
            labelParts: [
              { id: 'door-lock-op', text: 'op-' },
              { id: 'door-lock-gane', text: 'gane' },
            ],
          },
        ],
        correctPartIds: ['door-lock-op'],
        partialMessage:
          'The reversing arrow points to the prefix before the lock word.',
        wrongMessage:
          'gane names the lock. The reversing arrow points to the part that changes that state.',
        successMessage: 'op- reverses. gane is lock. opgane is unlock.',
      },
      {
        prompt: 'Now click the lock root in the completed command.',
        cards: [
          {
            id: 'cabin-door-root-card',
            title: 'Door Command',
            caption:
              'The same command combines a reversing prefix with the lock root.',
            visual: 'door-lock',
            imageKey: 'clueCabinDoorLock',
            label: 'opgane',
            labelAsTitle: true,
            labelParts: [
              { id: 'door-root-op', text: 'op-' },
              { id: 'door-root-gane', text: 'gane' },
            ],
          },
        ],
        correctPartIds: ['door-root-gane'],
        wrongMessage:
          'op- reverses the state. The root is the part that names the lock.',
        successMessage: 'gane is lock. Together, opgane unlocks the door.',
      },
    ],
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

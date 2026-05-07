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
      'Infer what al means from the alien message.',
    steps: [
      {
        meaningChips: [
          { id: 'i-me', label: 'I/me' },
          { id: 'you', label: 'you' },
          { id: 'she-her', label: 'she/her' },
          { id: 'he-him', label: 'he/him' },
          { id: 'we-us', label: 'we/us' },
          { id: 'they-them', label: 'they/them' },
        ],
        cards: [
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
          'The alien is pointing outward, toward the person being addressed.',
        successMessage:
          'al marks the person being addressed.',
      },
    ],
    morphemesLearned: ['al'],
    objective: 'pilot-chat',
  },

  planetDiscovery: {
    type: 'visual-discovery',
    title: 'Planet Posters',
    instructions:
      "There are two posters of planets. One is red and dusty, and the other has orange bands. These posters are labeled with the planets' names. Click on the alien word for 'planet'?",
    steps: [
      {
        cards: [
          {
            id: 'desarom-poster',
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
        anyCorrectPartIds: ['desarom-rom', 'fannarom-rom'],
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
      'Compare the crew nameplates and infer what the shared ending means.',
    steps: [
      {
        prompt:
          'Both labels end in nu, and both images show crew members. What does nu mean?',
        meaningOptions: [
          { id: 'person', label: 'person' },
          { id: 'place', label: 'place' },
          { id: 'thing', label: 'thing' },
          { id: 'theory', label: 'theory' },
        ],
        correctMeaningId: 'person',
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
        wrongMessage:
          'Both pictures show people with jobs, not places, objects, or ideas.',
        successMessage:
          'Both labels end with nu. -nu marks a person or doer.',
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
    type: 'gear-lock',
    title: 'Cabin Door Lock',
    instructions:
      'Rotate the gear until the reversing prefix flips into place in front of gane.',
    rootWord: 'gane',
    rootMeaning: 'lock',
    prefixLabel: 'op',
    solvedWord: 'opgane',
    solvedMeaning: 'unlock',
    successMessage: 'op- means un-.',
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

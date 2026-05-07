const refillTiles = [
  { id: 'ya-', label: 'ya-' },
  { id: 'op-', label: 'op-' },
  { id: 'a-', label: 'a-' },
  { id: 'me-', label: 'me-' },
  { id: 'moll', label: 'moll' },
  { id: 'gane', label: 'gane' },
];

export const stage2 = {
  id: 'stage2',
  name: 'Stage 2 - Clinic',
  room: 'clinic',

  introNarration: {
    type: 'narration',
    title: 'The Clinic',
    lines: [
      'Medical lights. A scanner. Shelves of bottles.',
      'The health monitor in my suit is still sliding down. I need the medicine the aliens were giving me.',
      'The bed label said puacarda. That word has to matter here.',
    ],
  },

  signChoice: {
    type: 'visual-discovery',
    title: 'Clinic Sign',
    instructions:
      'Compare the doorway labels. Click the parts that explain how room signs are built.',
    steps: [
      {
        prompt:
          'Both labels end in mar, and both images show rooms. What does mar mean?',
        meaningOptions: [
          { id: 'place', label: 'place' },
          { id: 'person', label: 'person' },
          { id: 'thing', label: 'thing' },
          { id: 'idea', label: 'idea' },
        ],
        correctMeaningId: 'place',
        cards: [
          {
            id: 'clinic-sign-card',
            title: 'Clinic Door',
            visual: 'clinic-sign',
            imageKey: 'clueClinicSign',
            label: 'derbemar',
            labelParts: [
              { id: 'clinic-sign-derbe', text: 'derbe' },
              { id: 'clinic-sign-mar', text: 'mar' },
            ],
          },
          {
            id: 'flight-sign-card',
            title: 'Flight Door',
            visual: 'flight-sign',
            imageKey: 'clueFlightSign',
            label: 'ramdemar',
            labelParts: [
              { id: 'flight-sign-ramde', text: 'ramde' },
              { id: 'flight-sign-mar', text: 'mar' },
            ],
          },
        ],
        wrongMessage:
          'Both pictures show rooms, not people, objects, or ideas.',
        successMessage:
          'Both labels end with mar. -mar marks a place or room.',
      },
      {
        prompt:
          'Now use the clinic doorway image. Click the part that names healing.',
        cards: [
          {
            id: 'clinic-sign-card',
            title: 'Clinic Door',
            visual: 'clinic-sign',
            imageKey: 'clueClinicSign',
            label: 'derbemar',
            labelParts: [
              { id: 'clinic-sign-derbe-2', text: 'derbe' },
              { id: 'clinic-sign-mar-2', text: 'mar' },
            ],
          },
          {
            id: 'flight-sign-card',
            title: 'Flight Door',
            visual: 'flight-sign',
            imageKey: 'clueFlightSign',
            label: 'ramdemar',
            labelParts: [
              { id: 'flight-sign-ramde-2', text: 'ramde' },
              { id: 'flight-sign-mar-2', text: 'mar' },
            ],
          },
        ],
        correctPartIds: ['clinic-sign-derbe-2'],
        wrongMessage:
          'The room ending is shared. The clinic-specific root is the other part.',
        successMessage:
          'derbe points to healing. derbemar is the clinic.',
      },
    ],
    morphemesLearned: ['-mar', 'derbemar'],
    objective: 'clinic-sign',
  },

  medicChoice: {
    type: 'visual-discovery',
    title: 'Medic Screen',
    instructions:
      'Use the medic screen and treatment log to infer the missing meanings.',
    steps: [
      {
        prompt:
          'The medic taps their own chest. What does il mean?',
        meaningOptions: [
          { id: 'i-me', label: 'I/me' },
          { id: 'you', label: 'you' },
          { id: 'she-her', label: 'she/her' },
          { id: 'he-him', label: 'he/him' },
          { id: 'we-us', label: 'us/we' },
          { id: 'they-them', label: 'they/them' },
        ],
        correctMeaningId: 'i-me',
        cards: [
          {
            id: 'medic-self-card',
            title: 'Medic Gesture',
            visual: 'medic-self',
            imageKey: 'clueMedicSelf',
            label: 'il',
            labelParts: [{ id: 'medic-self-il', text: 'il' }],
          },
        ],
        wrongMessage:
          'The medic is pointing to themself, not outward at someone else.',
        successMessage: 'il fits the self-pointing gesture. il means I/me.',
      },
      {
        prompt:
          'The log shows a completed treatment. Click the completed-entry ending.',
        cards: [
          {
            id: 'medic-job-card',
            title: 'Medical Crew',
            visual: 'medic',
            imageKey: 'crewMedic',
            label: 'derbenu',
            labelParts: [
              { id: 'medic-log-derbe-job', text: 'derbe' },
              { id: 'medic-log-nu', text: 'nu' },
            ],
          },
          {
            id: 'treatment-log-card',
            title: 'Completed Log',
            visual: 'treatment-log',
            imageKey: 'clueTreatmentLog',
            label: 'derbeuk',
            labelParts: [
              { id: 'medic-log-derbe-done', text: 'derbe' },
              { id: 'medic-log-uk', text: 'uk' },
            ],
          },
        ],
        correctPartIds: ['medic-log-uk'],
        wrongMessage:
          'The root is shared with the medic card. The completed log has a different ending.',
        successMessage: '-uk marks an action that already happened.',
      },
    ],
    morphemesLearned: ['il', '-uk'],
    objective: 'clinic-medic',
  },

  photosChoice: {
    type: 'treatment-slider',
    title: 'Treatment Wall',
    instructions:
      'Drag the treatment record from a-sondy to me-sondy.',
    beforeLabel: 'a-sondy',
    afterLabel: 'me-sondy',
    rootLabel: 'sondy',
    beforeImageKey: 'treatmentWallBeforeAi',
    afterImageKey: 'treatmentWallAfterAi',
    successMessage:
      'sondy is the treatment. a- marks before, and me- marks after.',
    morphemesLearned: ['a-', 'me-', 'sondy'],
    objective: 'clinic-photos',
  },

  medicineChoice: {
    type: 'builder',
    title: 'Medicine Shelf',
    instructions:
      'Use the specimen labels and the bed-label clue to identify the medicine.',
    steps: [
      {
        prompt:
          'Specimen cards show clear liquid, a planet, and a spiky germ. Select the germ label.',
        slotCount: 1,
        availableTiles: [
          { id: 'carda', label: 'carda' },
          { id: 'doda', label: 'doda' },
          { id: 'rom', label: 'rom' },
          { id: 'moll', label: 'moll' },
        ],
        correctSequence: ['carda'],
        wrongMessage:
          'That label belongs to a different specimen. Look for the spiky germ.',
        successMessage: 'carda labels the virus.',
      },
      {
        prompt:
          'The shelf lock accepts the two-part label on the anti-virus bottle.',
        slotCount: 2,
        availableTiles: [
          { id: 'pua-', label: 'pua-' },
          { id: 'carda', label: 'carda' },
          { id: 'lomi', label: 'lomi' },
          { id: 'fleck', label: 'fleck' },
          { id: 'doda', label: 'doda' },
          { id: 'moll', label: 'moll' },
        ],
        correctSequence: ['pua-', 'carda'],
        wrongMessage: 'That label does not match the bed clue or the virus symbol.',
        successMessage: 'puacarda assembled. This is the antiviral medicine.',
      },
    ],
    morphemesLearned: ['pua-', 'carda', 'puacarda'],
    healAmount: 0.35,
    objective: 'clinic-medicine',
    afterSolve: {
      type: 'narration',
      title: 'Medicine Taken',
      lines: [
        'You take the puacarda. The suit monitor brightens green.',
        'carda is virus. pua- works against it. puacarda is the antiviral medicine.',
      ],
    },
  },

  refillChoice: {
    type: 'builder',
    title: 'Refill Machine',
    instructions:
      'The clue card shows an empty rack filling again.',
    prompt: 'Build the matching refill command.',
    clues: [
      {
        id: 'refill-cycle',
        title: 'Refill Cycle',
        imageKey: 'clueRefillMachine',
      },
    ],
    slotCount: 2,
    availableTiles: refillTiles,
    correctSequence: ['ya-', 'moll'],
    wrongMessage: 'The bottles stay empty.',
    successMessage: 'yamoll fills the bottles again.',
    morphemesLearned: ['ya-', 'moll', 'yamoll'],
    objective: 'clinic-refill',
  },

  allObjectives: [
    'clinic-sign',
    'clinic-medic',
    'clinic-photos',
    'clinic-medicine',
    'clinic-refill',
  ],
  completionObjective: 'stage2-complete',

  completionNarration: {
    type: 'narration',
    title: 'Medicine Found',
    lines: [
      'puacarda: anti-virus medicine. That was what they were giving me.',
      'I feel steadier, but the card was clear: Earth needs more than one dose.',
      'The Lab should have the machinery to make this in bulk.',
    ],
  },
};

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
          'Both panels are doorway signs. Click the shared ending on both labels.',
        cards: [
          {
            id: 'clinic-sign-card',
            title: 'Clinic Door',
            caption: 'A medical room entrance with a blank sign panel.',
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
            caption: 'A navigation room entrance with the same kind of sign.',
            visual: 'flight-sign',
            imageKey: 'clueFlightSign',
            label: 'ramdemar',
            labelParts: [
              { id: 'flight-sign-ramde', text: 'ramde' },
              { id: 'flight-sign-mar', text: 'mar' },
            ],
          },
        ],
        correctPartIds: ['clinic-sign-mar', 'flight-sign-mar'],
        wrongMessage:
          'Look for the ending that appears on both doorway labels.',
        successMessage:
          'Both doorway labels end with mar. -mar marks a place or room.',
      },
      {
        prompt:
          'Now use the clinic doorway image. Click the part that names healing.',
        cards: [
          {
            id: 'clinic-sign-card',
            title: 'Clinic Door',
            caption: 'The sign belongs to the medical room.',
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
            caption: 'This sign belongs to a different room.',
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
      'Use the medic screen and treatment log to recover the missing tags.',
    steps: [
      {
        prompt:
          'The medic taps their own chest. Click the tag paired with that gesture.',
        cards: [
          {
            id: 'medic-self-card',
            title: 'Medic Gesture',
            caption: 'The medic points to themself.',
            visual: 'medic-self',
            imageKey: 'clueMedicSelf',
            label: 'il',
            labelParts: [{ id: 'medic-self-il', text: 'il' }],
          },
          {
            id: 'message-you-card',
            title: 'Viewer Gesture',
            caption: 'A known screen tag points outward.',
            visual: 'message-you',
            imageKey: 'messageYou',
            label: 'al',
            labelParts: [{ id: 'medic-you-al', text: 'al' }],
          },
        ],
        correctPartIds: ['medic-self-il'],
        wrongMessage:
          'That tag does not match the medic pointing to themself.',
        successMessage: 'il fits the self-pointing gesture.',
      },
      {
        prompt:
          'The log shows a completed treatment. Click the completed-entry ending.',
        cards: [
          {
            id: 'medic-job-card',
            title: 'Medical Crew',
            caption: 'A crew card for the medic job.',
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
            caption: 'The scanner panel shows treatment is finished.',
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
    type: 'visual-discovery',
    title: 'Treatment Wall',
    instructions:
      'Compare the before and after treatment photos to recover the photo labels.',
    steps: [
      {
        prompt:
          'Both photos are about the same procedure. Click the part shared by both labels.',
        cards: [
          {
            id: 'before-treatment-card',
            title: 'Before Photo',
            caption: 'The patient looks weak before treatment.',
            visual: 'treatment-before',
            imageKey: 'clueTreatmentBefore',
            label: 'a-sondy',
            labelParts: [
              { id: 'before-a', text: 'a-' },
              { id: 'before-sondy', text: 'sondy' },
            ],
          },
          {
            id: 'after-treatment-card',
            title: 'After Photo',
            caption: 'The patient looks healthy after treatment.',
            visual: 'treatment-after',
            imageKey: 'clueTreatmentAfter',
            label: 'me-sondy',
            labelParts: [
              { id: 'after-me', text: 'me-' },
              { id: 'after-sondy', text: 'sondy' },
            ],
          },
        ],
        correctPartIds: ['before-sondy', 'after-sondy'],
        wrongMessage:
          'The shared part names what both pictures are about.',
        successMessage:
          'Both labels share sondy. sondy is the treatment or procedure.',
      },
      {
        prompt:
          'Now click the marker on the before-treatment label.',
        cards: [
          {
            id: 'before-treatment-card',
            title: 'Before Photo',
            caption: 'The patient has not recovered yet.',
            visual: 'treatment-before',
            imageKey: 'clueTreatmentBefore',
            label: 'a-sondy',
            labelParts: [
              { id: 'before-a-2', text: 'a-' },
              { id: 'before-sondy-2', text: 'sondy' },
            ],
          },
          {
            id: 'after-treatment-card',
            title: 'After Photo',
            caption: 'The second label is the after state.',
            visual: 'treatment-after',
            imageKey: 'clueTreatmentAfter',
            label: 'me-sondy',
            labelParts: [
              { id: 'after-me-2', text: 'me-' },
              { id: 'after-sondy-2', text: 'sondy' },
            ],
          },
        ],
        correctPartIds: ['before-a-2'],
        wrongMessage:
          'The shared root is already known. The before marker is attached to the first label.',
        successMessage: 'a- marks the before state.',
      },
      {
        prompt:
          'Finally, click the marker on the after-treatment label.',
        cards: [
          {
            id: 'before-treatment-card',
            title: 'Before Photo',
            caption: 'The first label is the before state.',
            visual: 'treatment-before',
            imageKey: 'clueTreatmentBefore',
            label: 'a-sondy',
            labelParts: [
              { id: 'before-a-3', text: 'a-' },
              { id: 'before-sondy-3', text: 'sondy' },
            ],
          },
          {
            id: 'after-treatment-card',
            title: 'After Photo',
            caption: 'The patient has recovered.',
            visual: 'treatment-after',
            imageKey: 'clueTreatmentAfter',
            label: 'me-sondy',
            labelParts: [
              { id: 'after-me-3', text: 'me-' },
              { id: 'after-sondy-3', text: 'sondy' },
            ],
          },
        ],
        correctPartIds: ['after-me-3'],
        wrongMessage:
          'The after marker is attached to the recovered photo label.',
        successMessage: 'me- marks the after state.',
      },
    ],
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
      'The rack is empty, then the machine fills the same bottles again.',
    prompt: 'The rack needs the command that fills the same bottles again.',
    clues: [
      {
        id: 'refill-cycle',
        title: 'Refill Cycle',
        caption: 'Empty bottles return to the rack, then fill again.',
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

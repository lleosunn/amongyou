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
    type: 'choice',
    title: 'Clinic Sign',
    body: 'derbemar\n\nThe sign hangs above the medical room doors.',
    question:
      'You know "derbe" means cure / heal. What does "-mar" probably mean?',
    options: [
      { id: 'person', label: 'person' },
      { id: 'place', label: 'place' },
      { id: 'past', label: 'past action' },
      { id: 'against', label: 'against' },
    ],
    correctOptionId: 'place',
    morphemesLearned: ['-mar', 'derbemar'],
    objective: 'clinic-sign',
  },

  medicChoice: {
    type: 'choice',
    title: 'Medic Screen',
    instructions: 'The medic gestures while speaking through the screen.',
    steps: [
      {
        body: 'MEDIC: il derbe-uk al\n\nThe medic points to themself on "il" and points to you on "al".',
        question: 'What does "il" mean?',
        options: [
          { id: 'you', label: 'you' },
          { id: 'they', label: 'they / them' },
          { id: 'i', label: 'I / me' },
          { id: 'it', label: 'it' },
        ],
        correctOptionId: 'i',
      },
      {
        body: 'il derbe-uk al\n\nThe medic points to a completed treatment log.',
        question: 'What does "-uk" add to the action?',
        options: [
          { id: 'past', label: '-ed / already happened' },
          { id: 'now', label: '-ing / happening now' },
          { id: 'many', label: 'more than one' },
          { id: 'place', label: 'a place' },
        ],
        correctOptionId: 'past',
      },
    ],
    morphemesLearned: ['il', '-uk'],
    objective: 'clinic-medic',
  },

  photosChoice: {
    type: 'choice',
    title: 'Treatment Wall',
    instructions: 'Compare the left and right photo labels.',
    steps: [
      {
        body: 'LEFT: a-sondy\nRIGHT: me-sondy\n\nThe left photos are before treatment. The right photos are after.',
        question: 'What do "a-" and "me-" mean?',
        options: [
          { id: 'before-after', label: 'pre- / post-' },
          { id: 'good-bad', label: 'good / bad' },
          { id: 'large-small', label: 'large / small' },
          { id: 'lock-unlock', label: 'lock / unlock' },
        ],
        correctOptionId: 'before-after',
      },
      {
        body: 'a-sondy     me-sondy\n\nThe photos show a medical procedure and recovery.',
        question: 'What does "sondy" probably mean here?',
        options: [
          { id: 'surgery', label: 'surgery / treatment' },
          { id: 'meal', label: 'meal' },
          { id: 'star', label: 'star' },
          { id: 'sleep', label: 'sleep' },
        ],
        correctOptionId: 'surgery',
      },
    ],
    morphemesLearned: ['a-', 'me-', 'sondy'],
    objective: 'clinic-photos',
  },

  medicineChoice: {
    type: 'builder',
    title: 'Medicine Shelf',
    instructions:
      'Use the bed-label clue and the hazard-marked bottles to build the medicine label.',
    steps: [
      {
        prompt:
          'The crossed-out virus symbol appears beside pua-. Build the antiviral label from word parts.',
        slotCount: 2,
        availableTiles: [
          { id: 'pua-', label: 'pua-' },
          { id: 'carda', label: 'carda' },
          { id: 'lomi', label: 'lomi' },
          { id: 'fleck', label: 'fleck' },
          { id: 'derbe', label: 'derbe' },
          { id: 'yamoll', label: 'yamoll' },
        ],
        correctSequence: ['pua-', 'carda'],
        wrongMessage: 'That label does not match the bed clue or the virus symbol.',
        successMessage: 'puacarda assembled. This is the antiviral medicine.',
      },
    ],
    morphemesLearned: ['pua-', 'carda', 'puacarda', 'plumSeen'],
    healAmount: 0.25,
    objective: 'clinic-medicine',
  },

  refillChoice: {
    type: 'choice',
    title: 'Refill Machine',
    body: 'moll: 0\n\nButton: yamoll\n\nWhen pressed, the empty bottles fill again.',
    question: 'If "moll" is fill, what does "ya-" mean?',
    options: [
      { id: 'un', label: 'un- / reverse' },
      { id: 'again', label: 're- / again' },
      { id: 'before', label: 'pre- / before' },
      { id: 'anti', label: 'anti- / against' },
    ],
    correctOptionId: 'again',
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

const commandTiles = [
  { id: 'moll', label: 'moll' },
  { id: 'ya-', label: 'ya-' },
  { id: 'puacarda', label: 'puacarda' },
  { id: 'doda', label: 'doda' },
  { id: 'rom', label: 'rom' },
  { id: 'gane', label: 'gane' },
  { id: 'derbe', label: 'derbe' },
];

const speechTiles = [
  { id: 'il', label: 'il' },
  { id: 'al', label: 'al' },
  { id: 'kume', label: 'kume' },
  { id: 'ramde', label: 'ramde' },
  { id: 'derbe', label: 'derbe' },
];

export const stage3 = {
  id: 'stage3',
  name: 'Stage 3 - Lab',
  room: 'lab',

  introNarration: {
    type: 'narration',
    title: 'The Lab',
    lines: [
      'A production lab. Bottle racks, mixing vats, and a star map glow across the room.',
      'This is where the medicine can be made in bulk.',
      'I need enough puacarda for Earth, and I need the words to tell the aliens where to send it.',
    ],
  },

  signChoice: {
    type: 'visual-discovery',
    title: 'Lab Sign',
    instructions: 'Compare room signs from the clinic and lab.',
    steps: [
      {
        prompt: 'Both are room signs. Click the shared ending on both labels.',
        cards: [
          {
            id: 'lab-compare-clinic',
            title: 'Clinic Door',
            caption: 'The known clinic sign from the medical room.',
            visual: 'clinic-sign',
            imageKey: 'clueClinicSign',
            label: 'derbemar',
            labelParts: [
              { id: 'lab-compare-clinic-derbe', text: 'derbe' },
              { id: 'lab-compare-clinic-mar', text: 'mar' },
            ],
          },
          {
            id: 'lab-sign-card',
            title: 'Production Lab',
            caption: 'A bench room with vats, racks, and analysis screens.',
            visual: 'lab-sign',
            imageKey: 'clueLabSign',
            label: 'crutamar',
            labelParts: [
              { id: 'lab-sign-cruta', text: 'cruta' },
              { id: 'lab-sign-mar', text: 'mar' },
            ],
          },
        ],
        correctPartIds: ['lab-compare-clinic-mar', 'lab-sign-mar'],
        wrongMessage:
          'The matching ending is shared by both room signs.',
        successMessage: 'The lab sign uses the same room ending: -mar.',
      },
      {
        prompt: 'Now focus on the production lab picture. Click the part that names lab work.',
        cards: [
          {
            id: 'lab-compare-clinic',
            title: 'Clinic Door',
            caption: 'This sign names the healing room.',
            visual: 'clinic-sign',
            imageKey: 'clueClinicSign',
            label: 'derbemar',
            labelParts: [
              { id: 'lab-compare-clinic-derbe-2', text: 'derbe' },
              { id: 'lab-compare-clinic-mar-2', text: 'mar' },
            ],
          },
          {
            id: 'lab-sign-card',
            title: 'Production Lab',
            caption: 'The room is full of lab equipment and production vats.',
            visual: 'lab-sign',
            imageKey: 'clueLabSign',
            label: 'crutamar',
            labelParts: [
              { id: 'lab-sign-cruta-2', text: 'cruta' },
              { id: 'lab-sign-mar-2', text: 'mar' },
            ],
          },
        ],
        correctPartIds: ['lab-sign-cruta-2'],
        wrongMessage:
          'The room ending is already known. The lab-specific root is the other part.',
        successMessage: 'cruta points to lab work. crutamar is the lab.',
      },
    ],
    morphemesLearned: ['cruta', 'crutamar'],
    objective: 'lab-sign',
  },

  machineBuilder: {
    type: 'manufacturing-machine',
    title: 'Manufacturing Machine',
    instructions:
      'Fill in the missing treatment word, then increase production to the largest possible amount.',
    firstPrompt: 'Drag the correct word into the blank.',
    secondPrompt: 'Now push the machine output to its maximum size.',
    blankLabel: 'Sondy:',
    sliderLabel: 'Moll',
    options: commandTiles,
    correctOptionId: 'puacarda',
    successMessage: 'Correct! We want to maximize the amount of Anti-Virus we send. Now select the destination of the medicine on the destination map.',
    objective: 'lab-machine',
  },

  destinationBuilder: {
    type: 'builder',
    title: 'Destination Map',
    instructions:
      'The star map highlights a blue world and needs its destination label.',
    prompt: 'Build the highlighted destination.',
    clues: [
      {
        id: 'blue-planet-world',
        imageKey: 'planetDodarom',
      },
    ],
    slotCount: 2,
    availableTiles: commandTiles,
    correctSequence: ['doda', 'rom'],
    wrongMessage: 'The map cannot lock that destination.',
    successMessage: 'Destination locked: dodarom.',
    morphemesLearned: ['dodarom'],
    objective: 'lab-destination',
  },

  commsBuilder: {
    type: 'builder',
    title: 'Communication Door',
    instructions:
      'The door screen marks kume as speaking and asks who will speak.',
    prompt: 'Reply from this side.',
    clues: [
      {
        id: 'door-reply-screen',
        title: 'Door Screen',
        caption: 'The screen points the speaking question toward you.',
        imageKey: 'messageYou',
      },
    ],
    slotCount: 2,
    availableTiles: speechTiles,
    correctSequence: ['il', 'kume'],
    wrongMessage: 'The door waits for a clearer response.',
    successMessage: 'il kume. I speak.',
    morphemesLearned: ['kume'],
    objective: 'lab-comms',
  },

  allObjectives: [
    'lab-sign',
    'lab-machine',
    'lab-destination',
    'lab-comms',
  ],
  completionObjective: 'stage3-complete',

  completionNarration: {
    type: 'narration',
    title: 'Ready To Speak',
    lines: [
      'The cargo rack is full of puacarda.',
      'Earth is dodarom: the water planet.',
      'I can speak enough of the alien language to ask for help.',
    ],
  },

  vocabularyReview: {
    type: 'vocabulary-review',
    title: 'Words Before The Bridge',
    message:
      'Before going in to speak to the alien, I can take a moment to look at the words I have uncovered so far.',
    objective: 'vocab-review-complete',
  },
};

const commandTiles = [
  { id: 'moll', label: 'moll' },
  { id: 'yamoll', label: 'yamoll' },
  { id: 'puacarda', label: 'puacarda' },
  { id: 'doda', label: 'doda' },
  { id: 'rom', label: 'rom' },
  { id: 'gane', label: 'gane' },
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
      'A damaged lab. Warning lights. Empty bottle racks.',
      'This is where the medicine was made, and something here went wrong.',
      'I need enough puacarda for Earth, and I need the words to tell the aliens where to send it.',
    ],
  },

  signChoice: {
    type: 'choice',
    title: 'Lab Sign',
    body: 'crutamar\n\nA warning sign marks this whole room.',
    question: 'You know "-mar" marks a place. What does "cruta" probably mean?',
    options: [
      { id: 'science', label: 'science / lab work' },
      { id: 'fly', label: 'fly / go' },
      { id: 'water', label: 'water' },
      { id: 'lock', label: 'lock' },
    ],
    correctOptionId: 'science',
    morphemesLearned: ['cruta', 'crutamar'],
    objective: 'lab-sign',
  },

  logsSequence: {
    type: 'sequence',
    title: 'System Logs',
    instructions:
      'Arrange the event log in the order it happened. The -uk ending means each action is already complete.',
    entries: [
      {
        id: 'opganeuk',
        blah: 'opgane-uk',
        hint: 'unlock-ed',
      },
      {
        id: 'ferouk',
        blah: 'fero-uk',
        hint: 'escape-d',
      },
      {
        id: 'junkeuk',
        blah: 'junke-uk',
        hint: 'fail-ed / broke down',
      },
    ],
    correctOrder: ['opganeuk', 'ferouk', 'junkeuk'],
    replaySteps: [
      {
        icon: '1',
        text: 'Containment opgane-uk. Something was unlocked.',
      },
      {
        icon: '2',
        text: 'Virus fero-uk. The hazard escaped.',
      },
      {
        icon: '3',
        text: 'Factory junke-uk. The system failed and stopped production.',
      },
    ],
    morphemesLearned: ['fero', 'junke'],
    objective: 'lab-logs',
  },

  machineBuilder: {
    type: 'builder',
    title: 'Manufacturing Machine',
    instructions:
      'Use known BLAH words as commands. Build the phrases the machine accepts.',
    steps: [
      {
        prompt: 'Start one batch of antiviral medicine.',
        slotCount: 2,
        availableTiles: commandTiles,
        correctSequence: ['moll', 'puacarda'],
        wrongMessage: 'The vat stays empty.',
        successMessage: 'Accepted. The first bottles fill with puacarda.',
      },
      {
        prompt: 'Repeat the filling process for the cargo rack.',
        slotCount: 2,
        availableTiles: commandTiles,
        correctSequence: ['yamoll', 'puacarda'],
        wrongMessage: 'The cargo rack does not engage.',
        successMessage: 'Accepted. Bulk puacarda is ready.',
      },
    ],
    objective: 'lab-machine',
  },

  destinationBuilder: {
    type: 'builder',
    title: 'Destination Map',
    instructions:
      'The star map highlights a blue world. Build the BLAH compound for Earth.',
    prompt: 'Blue world: [ water ] + [ planet ]',
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
      'The screen flashes "al kume?" The alien is asking whether you speak.',
    prompt: 'Respond in BLAH.',
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
    'lab-logs',
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
      'I can speak enough BLAH to ask for help. The Bridge is open.',
    ],
  },
};

export const stage2 = {
  id: 'stage2',
  name: 'Stage 2 — Clinic',
  room: 'clinic',

  introNarration: {
    type: 'narration',
    title: 'A medical clinic...',
    lines: [
      "Medical equipment. Bottles. Patient photos on the wall.",
      "This must be where... mom worked.",
      "There's a door at the back — it's locked. The panel reads 'GANE-UK'.",
      "Look around. Maybe something in here tells me how to open it.",
    ],
  },

  doorPuzzle: {
    type: 'prefix-wheel',
    title: 'Locked Service Door',
    instructions:
      "The panel reads 'GANE-UK' — locked. Cycle the prefix key and find one that unlocks it.",
    rootWord: 'gane',
    suffix: '-uk',
    prefixes: [
      { id: 'a-', blah: 'a-' },
      { id: 'me-', blah: 'me-' },
      { id: 'pua-', blah: 'pua-' },
      { id: 'ya-', blah: 'ya-' },
      { id: 'op-', blah: 'op-' },
      { id: 'gan-', blah: 'gan-' },
      { id: 'gon-', blah: 'gon-' },
      { id: 'te-', blah: 'te-' },
    ],
    correctPrefixId: 'op-',
    wrongMessage: "The door stays shut. That's not the right prefix.",
    successMessage: 'The display turns green. The door hisses and slides open.',
    morphemesLearned: ['op-', 'gane', '-uk'],
    objective: 'clinic-door',
  },

  photosClue: {
    type: 'clue',
    title: 'Patient Photographs',
    body: 'a-sondy   —   me-sondy',
    note: "Four pairs of patients, each pair shows the same patient twice. Left side reads 'a-sondy', right side reads 'me-sondy'. Time passes between the two photos — an operation, a recovery.",
    morphemesLearned: ['a-', 'me-', 'sondy'],
    objective: 'clinic-photos',
  },

  bottlesClue: {
    type: 'clue',
    title: 'Full Medicine Bottle',
    body: 'pua-virus',
    note: "The label shows a viral creature with a red X over it. This must be a counter-agent — whatever 'pua-' means, it reverses or opposes.",
    morphemesLearned: ['pua-'],
    objective: 'clinic-bottles',
  },

  refillClue: {
    type: 'clue',
    title: 'Med Refill Machine',
    body: 'ya-moll',
    note: "A row of empty bottles sits under the machine. A green button blinks steadily. The label above reads 'ya-moll' — the machine fills bottles again.",
    morphemesLearned: ['ya-', 'moll'],
    objective: 'clinic-refill',
  },

  allObjectives: [
    'clinic-door',
    'clinic-photos',
    'clinic-bottles',
    'clinic-refill',
  ],
  completionObjective: 'stage2-complete',

  completionNarration: {
    type: 'narration',
    title: 'It\'s starting to fit together.',
    lines: [
      "So 'op-' reverses. 'a-' is before, 'me-' is after. 'pua-' is against.",
      "'ya-' repeats. That door was 'gane-uk' — locked — and 'op-gane-uk' — unlocked.",
      "The lab's open now. That's where mom and dad worked on... whatever was happening here.",
      "I need to know what happened.",
    ],
  },
};

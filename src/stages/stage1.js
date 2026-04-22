export const stage1 = {
  id: 'stage1',
  name: "Stage 1 — Pilot's Cabin",
  room: 'pilotCabin',

  introNarration: {
    type: 'narration',
    title: 'Waking up...',
    lines: [
      'Everything hurts. My head...',
      'Where am I?',
      'How did I get here?',
      'This... this is a spaceship. But the writing — I can\'t read any of it.',
      'I need to figure this out. Look around first.',
    ],
  },

  exploreHotspotIds: [
    'pilot-console',
    'pilot-stickies',
    'pilot-journal',
  ],
  exploreCompletionObjective: 'stage1-explored',

  drawingPromptNarration: {
    type: 'narration',
    title: 'Something catches your eye...',
    lines: [
      'A child\'s drawing, pinned to the wall. Crayon, handwritten labels.',
      'Three figures: a woman in a white coat, a man in a pilot helmet, and a child between them.',
      'Maybe if I match up the labels... I can figure out a few words.',
    ],
  },

  drawingPuzzle: {
    type: 'matching',
    title: "Child's Drawing",
    instructions:
      'Match each BLAH label to the figure it describes. Drag a label by clicking it, then clicking a figure.',
    targets: [
      {
        id: 'mom',
        label: 'WOMAN IN WHITE COAT',
        x: '8%',
        y: '18%',
        w: '26%',
        h: '66%',
        acceptedChips: ['ema', 'derbe', 'derbenu'],
      },
      {
        id: 'dad',
        label: 'MAN IN PILOT HELMET',
        x: '66%',
        y: '18%',
        w: '26%',
        h: '66%',
        acceptedChips: ['eba', 'ramde', 'ramdenu'],
      },
      {
        id: 'child',
        label: 'CHILD',
        x: '38%',
        y: '34%',
        w: '22%',
        h: '52%',
        acceptedChips: ['il'],
      },
    ],
    chips: [
      { id: 'ema', label: 'ema' },
      { id: 'eba', label: 'eba' },
      { id: 'il', label: 'il' },
      { id: 'derbe', label: 'derbe' },
      { id: 'derbenu', label: 'derbe-nu' },
      { id: 'ramde', label: 'ramde' },
      { id: 'ramdenu', label: 'ramde-nu' },
    ],
    morphemesLearned: ['ema', 'eba', 'il', 'derbe', 'ramde', '-nu'],
    completionObjective: 'stage1-complete',
  },

  solvedNarration: {
    type: 'narration',
    title: 'Something clicked.',
    lines: [
      'ema... mom. eba... dad. il... I.',
      'And -nu — the ending. "someone who does X." A doer.',
      'The woman heals — she\'s a "derbe-nu". A healer. A medic.',
      'The man flies — a "ramde-nu". A pilot.',
      'They\'re... my parents? This drawing is mine.',
      'The clinic door down the corridor — maybe I can work with this now.',
    ],
  },
};

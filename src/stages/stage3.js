export const stage3 = {
  id: 'stage3',
  name: 'Stage 3 — Lab',
  room: 'lab',

  introNarration: {
    type: 'narration',
    title: 'The lab...',
    lines: [
      "Something terrible happened here.",
      "One of the containment chambers is shattered. Biohazard warnings everywhere.",
      "There's a console still running — system logs. If I can read them, I'll know what happened.",
      "Everything in this room ends in '-uk'. Past tense. This all already happened.",
    ],
  },

  chamberClue: {
    type: 'clue',
    title: 'Broken Containment Chamber',
    body: 'escape-uk',
    note: "The glass is shattered outward. Whatever was in here broke free. The label on the base reads 'escape-uk' — something escaped. The '-uk' must mean it already happened.",
    objective: 'lab-chamber',
  },

  logsClue: {
    type: 'clue',
    title: 'System Event Log',
    body: '> op-gane-uk    [14:02]\n> escape-uk     [14:03]\n> gane-uk       [14:05]',
    note: "Three log entries, each ending in '-uk'. Actions that already happened: something was unlocked, something escaped, something was locked. The '-uk' suffix marks past tense — like English '-ed'.",
    morphemesLearned: ['-uk'],
    objective: 'lab-logs',
  },

  sequencePuzzle: {
    type: 'sequence',
    title: 'Reconstruct the Sequence',
    instructions:
      'The system can replay events — but only in the right order. Arrange the log entries in the sequence they actually happened.',
    entries: [
      {
        id: 'opganeuk',
        blah: 'op-gane-uk',
        hint: 'un-lock-ed',
      },
      {
        id: 'escapeuk',
        blah: 'escape-uk',
        hint: 'escape-d',
      },
      {
        id: 'ganeuk',
        blah: 'gane-uk',
        hint: 'lock-ed',
      },
    ],
    correctOrder: ['opganeuk', 'escapeuk', 'ganeuk'],
    replaySteps: [
      {
        icon: '🔓',
        text: 'Chamber op-gane-uk (unlocked). Containment disengaged.',
      },
      {
        icon: '💨',
        text: 'Virus escape-uk (escaped). Breach detected.',
      },
      {
        icon: '🔒',
        text: 'System gane-uk (locked). Emergency seal — too late.',
      },
    ],
    objective: 'lab-sequence',
  },

  allObjectives: ['lab-chamber', 'lab-logs', 'lab-sequence'],
  completionObjective: 'stage3-complete',

  completionNarration: {
    type: 'narration',
    title: 'Now I understand.',
    lines: [
      "The chamber was unlocked. The virus escaped. The system locked down — but too late.",
      "Mom and dad... they were trying to contain it. They couldn't.",
      "'-uk' marks the past. Things that already happened. Actions completed.",
      "op-gane-uk. escape-uk. gane-uk. Unlocked. Escaped. Locked.",
      "The comms room — if there's any way to call for help, it has to be there.",
    ],
  },
};

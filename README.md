# Among You

Among You is a React/Vite educational escape-room game based on the local
`game_design_docs/room_design.pdf` and `game_design_docs/storyline.pdf` design
documents.

The player is an astronaut who wakes up aboard a benevolent alien ship on
Planet 999. Mars is infected with zadotitis, and the astronaut must decode the
alien language to find antiviral medicine, manufacture more of it, and ask the
aliens to send the medicine home.

## Design Alignment

The current game implements the main four-room arc described in the PDFs:

1. **Pilot's Cabin** - inspect the bed label before it is readable, learn basic
   alien-language words, pronouns, roots, the `-nu` suffix, test the liquid
   dispenser, revisit the bed label as a translation check, and unlock the
   first door by building `opgane`.
2. **Clinic** - identify `derbemar`, learn treatment and medicine vocabulary,
   build `pua- carda` to identify `puacarda`, heal the player, and learn
   `yamoll`.
3. **Lab / Factory** - manufacture bulk `puacarda`, build `desarom` for Mars,
   prepare to speak with `il kume`, and review collected vocabulary before the
   Bridge.
4. **Bridge / Comms** - complete the final commander conversation to prove
   treatment, explain the Mars mission, request transport, and trigger the
   ending.

Core systems from the room design are also represented:

- A health bar starts near 60%, drains gently, never becomes a fail state, and
  rises when the correct medicine is taken.
- A word inventory tracks learned alien-language morphemes by pronoun, prefix, root,
  suffix, full word, and unresolved clue.
- Clickable room hotspots expose vocabulary through choice, visual-discovery,
  experiment, translation-check, builder, vocabulary-review, and conversation
  interactions.
- Locked room progression follows the PDF goals: cabin -> clinic -> lab ->
  bridge/comms.
- The ending reveals that alien-language word parts map to English morphology.

## Intentional Scope Notes

The implementation follows the revised four-stage structure in the PDFs rather
than treating Stage 5 as a separate room. The bridge/comms room contains the
final conversation and homeward ending.

Some lower-priority or alternate PDF ideas are not currently part of the main
playable path, including a rendered intro cinematic, the child drawing with
`ema`/`eba`, a full `-plum` payoff puzzle, drag-line matching, and more detailed
idle hint timing. These are polish or expansion opportunities, not blockers for
the current PDF-aligned playable arc.

## Run Locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run validate:data
npm run lint
npm run build
```

`validate:data` checks stage content, objectives, learned morphemes, and puzzle
tile references.

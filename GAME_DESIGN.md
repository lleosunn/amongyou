# Among You — Game Design

## Premise

You are an astronaut who wakes up on Planet 999 with no memory of how you got there. You're inside a spaceship built by an alien species called the **BLAH**. Everything in the ship works, but every instruction, label, and display is written in the BLAH language.

You cannot leave — Planet 999 is uninhabitable for humans. To survive, you must navigate the ship room-by-room and ultimately communicate to the BLAH that you want to go home. The BLAH language directly mirrors English morphology (prefixes, roots, suffixes) using the same letters. By the final stage, when the mapping is revealed, the player realizes they've been learning how English words are built all along.

**Target audience:** 6th grade (for the linguistics lesson), flexible for the game itself.

**Tone:** Stranded astronaut, alien-planet survival, linguistic detective work. _Project Hail Mary_ meets escape room.

## Storyline arc

1. Wake up confused in the pilot's cabin.
2. Learn basic roots (`mom`, `dad`, `I`, `pilot`, `medic`) to infer the astronaut is the child in the drawing.
3. Pick up prefixes and suffixes to get past the locked clinic door (`op-` = un-, `-ed` = `-uk`).
4. Combine everything in the lab to operate complex machinery and uncover what happened to the parents.
5. Build a full sentence — "I return to Earth" — to activate the portal and go home.

## BLAH Language Map

### Roots

| BLAH    | English               |
|---------|-----------------------|
| `ema`   | mom                   |
| `eba`   | dad                   |
| `il`    | I / me                |
| `al`    | you (singular)        |
| `el`    | they / them (singular)|
| `ol`    | it                    |
| `ill`   | we / us               |
| `all`   | you (plural)          |
| `ell`   | they / them (plural)  |
| `kume`  | speak / say           |
| `ramde` | fly / pilot           |
| `derbe` | cure / heal           |
| `gane`  | lock                  |
| `moll`  | fill                  |
| `sondy` | surgery               |

### Prefixes

| BLAH    | English | Visual cue                                          |
|---------|---------|-----------------------------------------------------|
| `op-`   | un-     | A locked door displaying `locked` → `op-locked`     |
| `a-`    | pre-    | Before/after operation photographs                  |
| `me-`   | post-   | Before/after operation photographs                  |
| `pua-`  | anti-   | Medicine bottle labels (anti-virus)                 |
| `ya-`   | re-     | Refill machine on empty medicine bottles            |
| `gan-`  | hyper-  | TBD                                                 |
| `gon-`  | hypo-   | TBD                                                 |
| `te-`   | multi-  | TBD                                                 |

### Suffixes

| BLAH     | English                          | Visual cue                          |
|----------|----------------------------------|-------------------------------------|
| `-plum`  | -able                            | TBD                                 |
| `-nu`    | -er (person who does ___)        | `ramde-nu` = pilot, `derbe-nu` = medic |
| `-uk`    | -ed                              | `gane-uk` = locked                  |

### Example constructions

| BLAH                  | English              | Meaning        |
|-----------------------|----------------------|----------------|
| `kume`                | speak                | speak / say    |
| `op-kume`             | un-speak             | be silent      |
| `a-kume`              | pre-speak            | predict        |
| `kume-plum`           | speak-able           | speakable      |
| `a-kume-plum`         | pre-speak-able       | predictable    |
| `op-a-kume-plum`      | un-pre-speak-able    | unpredictable  |
| `op-gane`             | un-lock              | unlock         |
| `op-gane-uk`          | un-lock-ed           | unlocked       |

## Room Layout

```
[Pilot's Cabin] -- [Clinic] -- [Lab] -- [Comms Room]
    Stage 1       Stage 2     Stage 3     Stages 4-5
```

Linear left-to-right. All rooms except the Pilot's Cabin start **locked**. Each stage's completion unlocks the next room.

| Room            | Color    | Stage    | Unlocks on              |
|-----------------|----------|----------|-------------------------|
| Pilot's Cabin   | Blue     | 1        | (starting room)         |
| Clinic          | Green    | 2        | `stage1-complete`       |
| Lab             | Yellow   | 3        | `stage2-complete`       |
| Comms Room      | Purple   | 4–5      | `stage3-complete`       |

## Gameplay

- Navigate rooms with on-screen directional arrows (up / down / left / right). Locked rooms show a 🔒 instead of an arrow icon.
- A **minimap** in the top-right shows all rooms with connections; locked rooms appear dimmed with a lock icon.
- Each room has **hotspots** — invisible clickable regions on the background image that open a modal when clicked. Some hotspots only appear after prerequisite objectives are complete.
- A **Morpheme Inventory** panel (bottom-left) tracks every BLAH morpheme the player has learned, with its English translation.
- **Narration boxes** carry the astronaut's inner monologue and objective hints.
- **Matching puzzles** teach new morphemes by having the player drop BLAH chips onto the correct figures/objects in a visual scene.
- **Prefix wheel puzzles** have the player cycle through prefix options to form the correct word (e.g. `op-gane-uk` to unlock a door).
- **Sequence puzzles** have the player arrange log entries in the correct causal order, then watch an animated replay confirming the events.

## Stage-by-stage design

### Stage 1 — Pilot's Cabin (IMPLEMENTED)

1. Player spawns. Narration: "Where am I? How did I get here? I need to figure this out."
2. Three explorable hotspots (control console, sticky notes, open journal) each show alien glyphs and flavor notes.
3. After all three are explored, a child's drawing hotspot appears on the wall.
4. Clicking the drawing opens a **matching puzzle**: assign BLAH labels (`ema`, `eba`, `il`, `derbe`, `derbe-nu`, `ramde`, `ramde-nu`) to the three figures (mom, dad, child).
5. Solving teaches: `ema`, `eba`, `il`, `derbe`, `ramde`, `-nu`.
6. Narration reveals the parents are a pilot and medic, and the astronaut is the child from the drawing. The Clinic unlocks.

**Morphemes learned:** `ema`, `eba`, `il`, `derbe`, `ramde`, `-nu`.

### Stage 2 — Clinic (IMPLEMENTED)

1. Intro narration on first entry: the astronaut recognizes this as the medical clinic and notices a locked service door reading `gane-uk`.
2. Four hotspots are available:
   - **Locked service door** (left) opens a **prefix wheel puzzle**: the display shows `[?]-gane-uk`. The player cycles through 8 prefixes and presses "Try it". Only `op-` opens the door. On solve, learns `op-`, `gane`, `-uk`.
   - **Before/after patient photographs** (top-center) opens a clue revealing `a-sondy` / `me-sondy`. Learns `a-`, `me-`, `sondy`.
   - **Full medicine bottles** (counter) opens a clue showing `pua-virus`. Learns `pua-`.
   - **Med Refill machine** (right) opens a clue showing `ya-moll`. Learns `ya-`, `moll`.
3. After all four objectives are complete, a reveal narration plays tying the morphemes together, and the Lab unlocks.

**Morphemes learned:** `op-`, `gane`, `-uk`, `a-`, `me-`, `sondy`, `pua-`, `ya-`, `moll`.

### Stage 3 — Lab (IMPLEMENTED)

1. Intro narration on first entry: the astronaut sees the shattered containment chamber and biohazard warnings. Everything in this room uses past tense (`-uk`).
2. Three hotspots, the third gated behind the first two:
   - **Broken containment chamber** (left) — a clue showing `escape-uk` ("escaped"), introducing `-uk` as past tense.
   - **System warning display** (top-right) — a clue showing a timestamped event log: `op-gane-uk`, `escape-uk`, `gane-uk`. Reinforces `-uk` and teaches that verbs can be inferred from context.
   - **Central console** (center, appears after chamber + logs) — opens a **sequence puzzle**: three log entries must be arranged in the correct causal order (unlock → escape → lock). On submit, the system runs a step-by-step animated replay confirming the sequence.
3. After all three objectives are complete, a reveal narration explains what happened: the chamber was unlocked, the virus escaped, the system locked down too late. The Comms Room unlocks.

**Morphemes reinforced/learned:** `-uk` (past tense / -ed).
**Concepts taught:** Verbs represent actions; `-uk` marks past tense; order of events reflects causality encoded in language.

### Stages 4–5 — Comms Room (PENDING)

1. Combine everything to restore the communications array.
2. Final conversation with a BLAH alien:

    ```
    Alien: Who are you?
    You:   il ramde-nu.              (I pilot.)
    Alien: You speak! What happened?
    You:   virus op-gane-uk.         (Virus escaped.)
           ema, eba op-kume.         (Mom, dad gone.)
           il ya-ramde Earth.        (I re-fly Earth.)
    Alien: Earth gane-uk. Help me op-gane.
    You:   *solves final puzzle*
    ```
3. Portal opens. Win.

## Win condition

Player constructs the sentence `il ya-ramde Earth` ("I return to Earth") using their full morpheme inventory, triggering the home portal.

## Implementation status

### Done

- React + Vite scaffolding.
- 4-room layout with aspect-ratio-locked scene rendering.
- Click-based directional navigation with locked-room gating.
- Minimap with locked / unlocked visualization.
- Hotspot system with percentage-based positioning and visibility gating.
- Modal system supporting `clue`, `narration`, `matching`, `prefix-wheel`, and `sequence` content types.
- `GameContext` tracking learned morphemes, completed objectives, and current stage.
- `MorphemeInventory` panel with collapsible UI.
- `NarrationBox` for multi-line inner monologue.
- `MatchingPuzzle` component with click-to-select chip-to-target interaction.
- `PrefixWheelPuzzle` component for cycling BLAH prefixes onto a root word.
- Full BLAH dictionary (`src/languageData.js`).
- Stage 1 end-to-end: wake-up narration → sequential hotspot exploration → drawing puzzle → morpheme gain → Clinic unlock.
- Stage 2 end-to-end: intro narration → four clinic hotspots (door prefix-wheel puzzle, before/after photos, medicine bottles, refill machine) → morpheme gain → Lab unlock.
- Stage 3 end-to-end: intro narration → broken chamber clue → system logs clue → sequence ordering puzzle with animated replay → Comms Room unlock.

### Pending
- Stages 4–5 sentence-building / dialogue system and final conversation.
- Final "unmasking" that reveals the BLAH ↔ English mapping.
- Polished artwork for all four rooms (currently using placeholder images).
- A proper child's-drawing asset (currently an SVG stick-figure mockup).
- Audio, music, SFX.

## Code map

| File / folder                                  | Purpose                                           |
|------------------------------------------------|---------------------------------------------------|
| `src/App.jsx`                                  | Top-level state, stage-1 wiring, modal dispatch   |
| `src/gameState.jsx`                            | `GameProvider` + `useGameState` hook              |
| `src/gameData.js`                              | Room definitions, connections, hotspots           |
| `src/languageData.js`                          | BLAH dictionary + `translate()` helper            |
| `src/stages/stage1.js`                         | Stage 1 narration, puzzle config, objective IDs   |
| `src/stages/stage2.js`                         | Stage 2 narration, prefix-wheel config, clues     |
| `src/stages/stage3.js`                         | Stage 3 narration, sequence puzzle config, clues  |
| `src/components/Room.jsx`                      | Room renderer + hotspot rendering & gating        |
| `src/components/Modal.jsx`                     | Modal dispatcher (`clue` / `narration` / `matching`) |
| `src/components/NavArrows.jsx`                 | Directional movement with locked-room awareness   |
| `src/components/Minimap.jsx`                   | SVG minimap                                        |
| `src/components/MatchingPuzzle.jsx`            | Chip-on-target matching interaction               |
| `src/components/PrefixWheelPuzzle.jsx`         | Cycling prefix selector for the locked-door puzzle |
| `src/components/SequencePuzzle.jsx`            | Reorder-and-replay event sequence puzzle          |
| `src/components/MorphemeInventory.jsx`         | Bottom-left collapsible learned-words panel       |
| `src/components/NarrationBox.jsx`              | Standalone click-to-advance narration (unused, reserved) |
| `src/assets/rooms/*.png`                       | Room background placeholders                       |
| `src/assets/childs-drawing.svg`                | Stage 1 matching-puzzle drawing placeholder       |

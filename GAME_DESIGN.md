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

## Stage-by-stage design

### Stage 1 — Pilot's Cabin (IMPLEMENTED)

1. Player spawns. Narration: "Where am I? How did I get here? I need to figure this out."
2. Three explorable hotspots (control console, sticky notes, open journal) each show alien glyphs and flavor notes.
3. After all three are explored, a child's drawing hotspot appears on the wall.
4. Clicking the drawing opens a **matching puzzle**: assign BLAH labels (`ema`, `eba`, `il`, `derbe`, `derbe-nu`, `ramde`, `ramde-nu`) to the three figures (mom, dad, child).
5. Solving teaches: `ema`, `eba`, `il`, `derbe`, `ramde`, `-nu`.
6. Narration reveals the parents are a pilot and medic, and the astronaut is the child from the drawing. The Clinic unlocks.

**Morphemes learned:** `ema`, `eba`, `il`, `derbe`, `ramde`, `-nu`.

### Stage 2 — Clinic (PENDING)

1. Locked door puzzle: turn a prefix wheel until the display reads `op-gane-uk` (`un-locked`). Door opens.
2. Wall of before/after patient photographs labeled `a-sondy` / `me-sondy` → teaches `a-` (pre-) and `me-` (post-).
3. Medicine-bottle counter: full bottles labeled `pua-virus` → teaches `pua-` (anti-). Empty bottles near a `ya-moll` machine → teaches `ya-` (re-) and `moll` (fill).
4. Completing all interactions unlocks the Lab.

**Morphemes learned:** `op-`, `-uk`, `gane`, `a-`, `me-`, `sondy`, `pua-`, `ya-`, `moll`.

### Stage 3 — Lab (PENDING)

1. Player pieces together that the child from the drawing is themselves — a virus escaped from the lab and infected the parents.
2. Puzzles combine previously-learned morphemes to activate lab machinery.
3. Completing this stage unlocks the Comms Room.

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
- Modal system supporting `clue`, `narration`, and `matching` content types.
- `GameContext` tracking learned morphemes, completed objectives, and current stage.
- `MorphemeInventory` panel with collapsible UI.
- `NarrationBox` for multi-line inner monologue.
- `MatchingPuzzle` component with click-to-select chip-to-target interaction.
- Full BLAH dictionary (`src/languageData.js`).
- Stage 1 end-to-end: wake-up narration → sequential hotspot exploration → drawing puzzle → morpheme gain → Clinic unlock.

### Pending

- Stage 2 interactions (door prefix wheel, before/after photos, medicine bottles, refill machine).
- Stage 3 puzzles and story beats.
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
| `src/components/Room.jsx`                      | Room renderer + hotspot rendering & gating        |
| `src/components/Modal.jsx`                     | Modal dispatcher (`clue` / `narration` / `matching`) |
| `src/components/NavArrows.jsx`                 | Directional movement with locked-room awareness   |
| `src/components/Minimap.jsx`                   | SVG minimap                                        |
| `src/components/MatchingPuzzle.jsx`            | Chip-on-target matching interaction               |
| `src/components/MorphemeInventory.jsx`         | Bottom-left collapsible learned-words panel       |
| `src/components/NarrationBox.jsx`              | Standalone click-to-advance narration (unused, reserved) |
| `src/assets/rooms/*.png`                       | Room background placeholders                       |
| `src/assets/childs-drawing.svg`                | Stage 1 matching-puzzle drawing placeholder       |

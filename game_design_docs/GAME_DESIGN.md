# Among You - Game Design

## Premise

You are an astronaut who wakes up inside a benevolent alien spaceship on Planet 999. Earth is infected with zadotitis, and you were sent to retrieve antiviral medicine. Your first clues are metal walls, strange technology, stars outside the window, and a mission note from Earth.

The aliens want to help, but every ship label, console, and message is written in the alien language. To survive and bring medicine home, the player learns how alien-language words are built from meaningful parts. The alien language mirrors English morphology with roots, prefixes, suffixes, pronouns, and compounds.

## Core Loop

Each stage follows the same pattern:

1. A concrete survival goal.
2. A room obstacle written in the alien language.
3. A language interaction that teaches usable word parts.
4. A puzzle that uses those word parts to change the world.

The health bar starts near 60%, slowly drains to a safe floor, flashes at critical health, and stabilizes once the player chooses the correct medicine. The word inventory tracks learned alien-language items by type and keeps unresolved clues visible until they are solved.

## Alien Language Map

### Pronouns

| Alien | English |
| ----- | ------- |
| `il` | I / me |
| `al` | you |

### Roots

| Alien | English |
| ----- | ------- |
| `rom` | planet |
| `doda` | water |
| `carda` | virus |
| `ramde` | fly / go |
| `derbe` | heal / cure |
| `gane` | lock |
| `moll` | fill |
| `sondy` | surgery / treatment |
| `cruta` | science / lab work |
| `kume` | speak / say |

### Prefixes And Suffixes

| Alien | English |
| ----- | ------- |
| `op-` | un- |
| `a-` | pre- |
| `me-` | post- |
| `pua-` | anti- |
| `ya-` | re- |
| `-nu` | -er / person who does |
| `-uk` | -ed / already happened |
| `-mar` | -ery / place |

### Constructed Words

| Alien | Meaning |
| ----- | ------- |
| `opgane` | unlock |
| `ramdenu` | pilot |
| `derbenu` | doctor / medic |
| `derbemar` | clinic |
| `crutamar` | lab / factory |
| `puacarda` | antiviral medicine |
| `yamoll` | refill |
| `dodarom` | Earth / water planet |

## Stages

### Stage 1 - Pilot's Cabin

Goal: figure out where you are and unlock the cabin door.

Key interactions:

- Message screen uses avatar gesture cards to teach `al = you`.
- Planet posters use illustrated `dodarom` and `fannarom` cards to teach
  `rom = planet` through the repeated label part.
- Crew roster uses illustrated job cards to teach `-nu`, `ramde`, `derbe`,
  `ramdenu`, and `derbenu`.
- Liquid dispenser teaches `doda = water` through visual button testing.
- Bed label is visible from the start, changes its readable detail as `al` and
  `rom` are learned, and becomes a small translation check for `al: rom?`. It
  flashes after the opening narration so players inspect it first, and it also
  introduces unresolved `puacarda`.
- Door builder teaches `gane`, `op-`, and `opgane` by building `[op-] [gane]`.

Completion unlocks the Clinic.

### Stage 2 - Clinic

Goal: find and take the correct antiviral medicine.

Key interactions:

- Clinic sign teaches `-mar` and `derbemar` by comparing the `derbemar`
  clinic sign with a second room sign, `ramdemar`.
- Medic screen teaches `il` and `-uk` through avatar gesture and completed
  treatment-log visuals.
- Treatment wall teaches `a-`, `me-`, and `sondy` by comparing before and
  after treatment cards labeled `a-sondy` and `me-sondy`.
- Medicine shelf first scaffolds `carda = virus` from a germ specimen, then
  teaches `pua-`, resolves `puacarda` by building `[pua-] [carda]`, and heals
  the player with a visible green health-bar response.
- Refill machine teaches `ya-`, `moll`, and `yamoll` by using a machine-state
  clue to build the refill command.

Completion unlocks the Lab.

### Stage 3 - Lab / Factory

Goal: make medicine in bulk and prepare to speak to the aliens.

Key interactions:

- Lab sign teaches `cruta` and `crutamar` by comparing the known `derbemar`
  room sign with the production-lab sign.
- Manufacturing machine requires `moll puacarda`, then `ya- moll puacarda`.
- Destination map uses a blue-ocean-world clue panel and requires `doda rom`,
  forming `dodarom`.
- Communication door introduces `kume` with the `al kume?` screen clue and
  requires `il kume`.
- Vocabulary review prompts the player to look over learned words before entering the Bridge.

Completion unlocks the vocabulary review; finishing or dismissing the review unlocks the Bridge / Comms room.

### Stage 4 - Bridge / Comms

Goal: hold enough of an alien-language conversation to go home and send medicine to Earth.

Final commander conversation:

- Prove treatment: `il derbe -uk`.
- Explain the mission: `il ya- ramde derbe doda rom`.
- Ask for transport: `al ramde pua- carda doda rom`.

Each bridge step includes a visual clue panel: scanner status, Earth route with
cargo, and the commander's transport request.

The ending reveals the lesson: alien-language word parts map to English morphology, so the player has been learning how English words are built.

## Implementation Status

Implemented:

- React + Vite app.
- Four-room linear layout with locked room gating.
- Minimap, directional arrows, health bar, vocabulary inventory, and room
  mission log.
- Hotspot system with objective requirements and highlighting.
- Modal content types for clue, narration, matching, prefix wheel, sequence,
  choice, experiment, visual discovery, builder, vocabulary review, and
  conversation.
- Shared AI-generated clue assets for discovery, builder, and conversation
  puzzles, with alien labels rendered as DOM text.
- PDF-aligned stages 1-4 with a playable full arc.

Pending polish:

- Final art pass for each room.
- Rendered intro cinematic.
- Audio, chimes, and ambient sound.
- More nuanced hint timing and optional side clues.

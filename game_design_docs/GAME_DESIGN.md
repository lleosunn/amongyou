# Among You - Game Design

## Premise

You are an astronaut who wakes up inside a benevolent alien spaceship on Planet 999. Earth is infected with zadotitis, and you were sent to retrieve antiviral medicine. Your last memories are a low-fuel alarm, a crash, and alien hands carrying you to safety.

The alien species, the BLAH, want to help, but every ship label, console, and message is written in BLAH. To survive and bring medicine home, the player learns how BLAH words are built from meaningful parts. BLAH mirrors English morphology with roots, prefixes, suffixes, pronouns, and compounds.

## Core Loop

Each stage follows the same pattern:

1. A concrete survival goal.
2. A room obstacle written in BLAH.
3. A language interaction that teaches usable word parts.
4. A puzzle that uses those word parts to change the world.

The health bar starts near 60%, slowly drains to a safe floor, and rises when the player chooses the correct medicine. The word inventory tracks learned BLAH items by type and keeps unresolved clues visible until they are solved.

## BLAH Language Map

### Pronouns

| BLAH | English |
| ---- | ------- |
| `il` | I / me |
| `al` | you |

### Roots

| BLAH | English |
| ---- | ------- |
| `rom` | planet |
| `doda` | water |
| `carda` | virus |
| `ramde` | fly / go |
| `derbe` | cure / heal |
| `gane` | lock |
| `moll` | fill |
| `sondy` | surgery / treatment |
| `cruta` | science / lab work |
| `fero` | escape |
| `junke` | fail / break down |
| `kume` | speak / say |

### Prefixes And Suffixes

| BLAH | English |
| ---- | ------- |
| `op-` | un- |
| `a-` | pre- |
| `me-` | post- |
| `pua-` | anti- |
| `ya-` | re- |
| `-nu` | -er / person who does |
| `-uk` | -ed / already happened |
| `-mar` | -ery / place |
| `-plum` | unresolved seed for -able |

### Constructed Words

| BLAH | Meaning |
| ---- | ------- |
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

- Message screen teaches `al = you`.
- Planet posters teach `rom = planet`.
- Crew roster teaches `-nu`, `ramde`, `derbe`, `ramdenu`, and `derbenu`.
- Liquid dispenser teaches `doda = water`.
- Bed label uses known words in `al: rom?` and introduces unresolved `puacarda`.
- Door builder teaches `gane`, `op-`, and `opgane` by building `[op-] [gane]`.

Completion unlocks the Clinic.

### Stage 2 - Clinic

Goal: find and take the correct antiviral medicine.

Key interactions:

- Clinic sign teaches `-mar` and `derbemar`.
- Medic screen teaches `il` and `-uk`.
- Treatment wall teaches `a-`, `me-`, and `sondy`.
- Medicine shelf teaches `pua-`, `carda`, resolves `puacarda`, and heals the player.
- Refill machine teaches `ya-`, `moll`, and `yamoll`.

Completion unlocks the Lab.

### Stage 3 - Lab / Factory

Goal: make medicine in bulk and prepare to speak to the aliens.

Key interactions:

- Lab sign teaches `cruta` and `crutamar`.
- System logs reinforce `-uk` and teach `fero` and `junke` through event sequencing.
- Manufacturing machine requires `moll puacarda`, then `yamoll puacarda`.
- Destination map requires `doda rom`, forming `dodarom`.
- Communication door introduces `kume` and requires `il kume`.

Completion unlocks the Bridge / Comms room.

### Stage 4 - Bridge / Comms

Goal: hold enough of a BLAH conversation to go home and send medicine to Earth.

Final commander conversation:

- Prove treatment: `il derbe -uk`.
- Explain the mission: `il ya- ramde derbe dodarom`.
- Ask for transport: `al ramde puacarda dodarom`.

The ending reveals the lesson: BLAH word parts map to English morphology, so the player has been learning how English words are built.

## Implementation Status

Implemented:

- React + Vite app.
- Four-room linear layout with locked room gating.
- Minimap, directional arrows, health bar, and vocabulary inventory.
- Hotspot system with objective requirements and highlighting.
- Modal content types for clue, narration, matching, prefix wheel, sequence, choice, builder, and conversation.
- PDF-aligned stages 1-4 with a playable full arc.

Pending polish:

- Final art pass for each room.
- Rendered intro cinematic.
- Audio, chimes, and ambient sound.
- More nuanced hint timing and optional side clues.

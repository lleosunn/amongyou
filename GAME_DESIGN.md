# Among You — Game Design Document

## Premise / Story

<!-- What's the setting? Why is the player trapped? What happened? -->

TBD

## Gameplay

- Single-player escape room
- Player navigates between rooms using directional arrow buttons (no WASD)
- Each room can contain interactable objects and clues
- Clues involve a fictional language the player must decode to escape
- Minimap in the top-right shows all rooms and the player's current location
- Rooms can have clickable hotspots (invisible regions over the background image) that open modal popups with clues, notes, or puzzles
- Click outside a popup to dismiss it

## Win Condition

<!-- What does the player need to do to "escape"? Solve all puzzles? Reach a specific room? Assemble something? -->

TBD

## Room Map

Current layout (5 rooms):

```
[Security]
    │
[Electrical] ── [Storage] ── [Navigation]
                                  │
                              [Weapons]
```

### Security
- **Color:** Red (#e05555)
- **Position:** Above Electrical
- **Contents:** TBD
- **Puzzles:** TBD

### Electrical
- **Color:** Yellow (#e8c840)
- **Position:** Left of Storage, below Security
- **Interactables:**
  - Control screens (triple green monitors) — displays a linguistic clue: `ᛊᚨᛚ  ᚹᛟᚱ  ᛏᚨᚾ  ᛒᛖᛚᚨ`
- **Puzzles:** TBD

### Storage
- **Color:** Blue (#4a9eff)
- **Position:** Center, between Electrical and Navigation
- **Contents:** TBD
- **Puzzles:** TBD

### Navigation
- **Color:** Green (#50c878)
- **Position:** Right of Storage, above Weapons
- **Contents:** TBD
- **Puzzles:** TBD

### Weapons
- **Color:** Purple (#c77dff)
- **Position:** Below Navigation
- **Contents:** TBD
- **Puzzles:** TBD

## Fictional Language

<!-- Describe the language system here: alphabet, grammar rules, vocabulary, how the player learns/decodes it -->

TBD

## Puzzle Design

<!-- List out the puzzles, which rooms they're in, how they connect, and what the player needs to figure out -->

TBD

## Future Ideas

- More rooms (expand the map in any direction)
- Multiplayer support
- Timed mode
- Inventory system
- Room-specific ambient sounds / visuals

# Prototype Feedback

Priority note from source feedback: red items are the most important or urgent.

Legend:

- ~~Struck through~~ = already done in the current prototype.
- `[Partial]` = some supporting work is in place, but the feedback is not fully addressed.
- `[Todo]` = not yet addressed or needs design/implementation work.

## Pilot's Cabin

### Opening Scene

- ~~Add more context so the player understands the astronaut is in a spaceship.~~ Done in the current "Waking up..." narration.
- ~~Use opening copy along these lines: "Ouch. My head hurts. Where am I? ... metal walls ... stars outside ... alien spaceship ... message from Earth ... unfamiliar writing ... return home with a cure ... gather clues."~~ Done in current narration text, with the more concise final wording.
- ~~Use this line for text 4: "All of the writing in this spaceship is unfamiliar. How can I communicate to the aliens that I need to return home with a cure?"~~ Done.
- ~~Prevent the opening scene from triggering again after reentering the room.~~ Done for room re-entry in the current session.

### Bed Label

- `[Todo]` Remove the alien-face icon from the bed label, since the label is meant to describe the astronaut.
- `[Partial]` Make the bed label the first thing the player sees. Current prototype highlights it after the intro with an idle hint, but does not automatically open it.
- ~~Make the label unreadable until the player learns `al` and `rom`.~~ Done.
- ~~Use different descriptions depending on whether required words are unlocked.~~ Done with locked and ready messages.
- ~~Turn the bed label into a small understanding check with a text box.~~ Done.
- ~~Avoid subtitles giving away the answer immediately.~~ Done; the decode is hidden for this check.
- ~~The example "you planet" is the actual answer and should not be shown before solving.~~ Done.
- ~~Keep the confirmation text visible long enough to read instead of auto-closing after about 1 second.~~ Done; solved interactions stay open until closed.

### Message Screen

- ~~Change the instruction to "Match the words to what the alien is pointing at."~~ Done.
- ~~Replace generic "screen tag A/B" style labels with `il` and `al`.~~ Done.
- ~~Have the player match or drag `you` and `I / me` to the images.~~ Done.
- ~~Use an avatar or image gesture instead of only text description.~~ Done; the puzzle uses gesture images.
- `[Partial]` Still consider whether captions like "The alien taps their chest" make the puzzle too easy.

### Planet Posters

- `[Todo]` Change one of `desarom` or `fannarom` to `dodarom` for Earth consistency.
- `[Todo]` Suggested wording: "There are two posters of planets. One is full of water and the other has rings. What is the root of both of these words?"
- `[Todo]` Change "Blue Water World" to "Dodarom" and "Ringed Amber World" to "Fannarom" if those labels appear in the UI.
- `[Todo]` Change subtitle wording to "The poster shows an orange planet with rings."
- `[Partial]` The current explanation text is shorter than before, but it still uses red/dusty Mars plus orange bands rather than water world plus rings.
- `[Partial]` Make labels feel embedded in the scene rather than like detached worksheet buttons. Current labels can appear as card titles, but they are not fully integrated into the poster art.
- `[Todo]` Optional richer version: add a small dictionary page where the player drags shared morphemes such as `rom` as evidence.

### Crew Roster

- `[Todo]` Fix inconsistency around `cure`, `heal`, and `cure/heal` across the whole game, not only this puzzle.
- ~~Change repeated crew image captions to: "A helmet, map, and ship controls are visible in this image."~~ Done.
- ~~Change repeated medical crew captions to: "A medical coat, scanner, and medicine kit are visible in this image."~~ Done.
- ~~Avoid the old second-slide caption that gave away the answer.~~ Done.
- ~~Reduce the "click the part" quiz cadence.~~ Done; the roster is now one side-by-side role-root matching interaction.
- ~~Possible redesign: show all crewmates side by side and have the player drag morphemes onto roles.~~ Done for the current two-role roster content.

### Liquid Dispenser

- ~~Make the dispenser interactive rather than just telling the player what each button dispenses.~~ Done; the player presses buttons and sees the cup fill.
- ~~Let the cup refill animation replay for each liquid.~~ Done.
- ~~Remove result text like "The cup fills" from the dispenser UI.~~ Done.

### Cabin Door Lock

- `[Partial]` The current door panel now shows `gane` with a lock icon and `op-` with a reversing arrow, but `op-` still may feel newly introduced at the lock.
- ~~When the wrong prefix is used, give more visceral feedback: red light and mechanical thunk.~~ Done.

## Clinic

### Medicine Shelf

- `[Todo]` Rework or justify the second medicine-shelf puzzle if it still feels too easy or silly.
- ~~Prevent the medicine shelf from being solved immediately at the beginning of the clinic.~~ Done; it is gated behind clinic sign, medic screen, and treatment wall objectives.
- `[Todo]` Do not refresh the player's memory with `derbe`; make recall come from the player.

### Health Bar

- ~~Stop the health bar from continuing to drain after taking the medicine.~~ Done.
- ~~Flash or warn when health gets low.~~ Done.
- ~~Turn the health bar green / give a positive healing response after medicine.~~ Done.

### Medic Screen

- `[Partial]` Current instruction says "Use the medic screen and treatment log to recover the missing tags," which moves in the requested direction.
- `[Todo]` Consider changing the prompt to something like "Which one of these is the medic?"
- `[Todo]` Change "Medic Gesture" to `derbenu` and "Viewer Gesture" to a better alien-side label if appropriate.
- `[Todo]` Remove giveaway captions such as "The medic points to themself" and "A known screen tag points outward" so players infer from the images.

### Treatment Wall

- ~~Make the wall less direct/easy.~~ Done by replacing the click-card sequence with a treatment slider.
- ~~Change "Before Photo" to `Asondy` / `a-sondy` and "After Photo" to `Mesondy` / `me-sondy`.~~ Done with `a-sondy` and `me-sondy` endpoint labels.
- ~~Remove captions that explicitly say the patient has not recovered, that the second label is after, or that the first label is before.~~ Done.
- ~~Optional richer version: replace the two static cards with a slider from `a-sondy` sick state to `me-sondy` healed state, with the alien face transforming across the slider.~~ Done.

### Refill Machine

- `[Todo]` Introduce or scaffold `ya-` and `moll` before the refill-machine answer, so this feels less like guessing.

## Laboratory

### Storyline And Sequencing

- ~~Remove references to the lab being damaged.~~ Done in current stage data.
- ~~Remove the sequencing station where the player pieces together a series of events.~~ Done; no current stage uses the sequence station.
- ~~Keep the lab focused on refilling/manufacturing medicine.~~ Done.

### Lab Sign

- `[Todo]` Fix the lab sign if it still obscures the name of the location.

### Overall Look

- `[Todo]` Reduce glitter/sparkle in the lab visuals.

### Destination Map

- ~~`[Partial]` Current destination map uses Earth as `doda rom` and shows a blue ocean world.~~
- ~~`[Todo]` Make the player figure out or remember Earth = water + planet more independently.~~
- ~~`[Todo]` Avoid prompts that refresh the player's memory too directly.~~

## Communication / Vocabulary Review

- ~~Before moving the player to the communication room, prompt them to review collected vocabulary.~~ Done.
- ~~Use message: "Before going in to speak to the alien, I can take a moment to look at the words I have uncovered so far."~~ Done.

## Bridge

- ~~Remove the English word "verified" from final alien dialogue, or replace it with alien-language text.~~ Done; current text does not use "verified."
- ~~Split final responses into morpheme pieces to make the puzzle harder.~~ Done for current Commander Channel tiles.
- `[Todo]` Reduce glitter/sparkle in the Bridge visuals.
- ~~Add scaffolding for the second Commander Channel response so the player understands the mission idea.~~ Done.
- ~~After about 5 failed attempts on the second Commander Channel response, show a stronger hint.~~ Done.

## Other / General

### Language Naming

- ~~Replace user-visible "BLAH" with "the alien language" or no language name.~~ Done in current user-facing copy.

### Puzzle Feel

- `[Partial]` Make puzzles more interactive and less like direct Q&A.
- `[Partial]` Use more images instead of only words. Current prototype has image-based visual discovery, but several prompts still read like worksheet questions.
- `[Todo]` Reduce the ability to mindlessly click until the correct answer appears.
- `[Todo]` Continue moving toward escape-room style interactions instead of simple multiple choice.

### Popups And Review

- ~~Let players re-read or review popups.~~ Done; solved interactions can be reopened and each room now has a Review Briefing action for intro narration.
- ~~Add both Next and Back buttons to multi-line popups.~~ Done.
- ~~Make the word bank/list accessible while a popup is open.~~ Done; modals include the word bank.
- ~~After completing an interaction, reopening it should show the completed answer rather than resetting.~~ Done for current interactive puzzle modals.

### Health / Failure Design

- ~~At about 20%, make the health state red/flashing.~~ Done; current critical threshold is near 20%.
- `[Todo]` At 15%, trigger an opportunity popup with one chance to answer a matching question.
- `[Todo]` If failed, at 5%, trigger a second popup with a short sentence typed by the player.
- `[Todo]` If failed again, allow health to reach 0% and restart.
- `[Todo]` Consider an extra stored `puacarda` or healing method.
- `[Todo]` After completing emergency popups, allow revisiting the popup with the correct answer rather than resetting.

### Mission And Navigation

- ~~Add a mission log / goal structure.~~ Done.
- ~~Use missions or a goal bar instead of a timer.~~ Done in spirit; the current prototype uses missions/objectives and no fail-state timer.

### Tutorial

- `[Todo]` Add a mini-tutorial to teach interaction mechanics, since players may not read instructions.

## Game Name Ideas

- `al`
- `Return to Dodarom`
- `Puacarda`
- `Among Them`

## Notes

- `[Todo]` Mini-tutorial.
- ~~Missions or goal bar instead of a timer.~~ Done in current direction.

import { roomConfigs } from '../src/roomData.js';
import { stage1 } from '../src/stages/stage1.js';
import { stage2 } from '../src/stages/stage2.js';
import { stage3 } from '../src/stages/stage3.js';
import { stage4 } from '../src/stages/stage4.js';
import { allMorphemes } from '../src/languageData.js';

const stages = [stage1, stage2, stage3, stage4];
const allowedContentTypes = new Set([
  'builder',
  'choice',
  'clue',
  'conversation',
  'experiment',
  'matching',
  'narration',
  'prefix-wheel',
  'sequence',
  'vocabulary-review',
]);

const errors = [];
const hotspotObjectives = new Set();
const knownObjectives = new Set();
const roomObjectiveIds = new Map();

function addError(message) {
  errors.push(message);
}

function normalizeList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

function walk(value, visitor, path = 'root') {
  if (!value || typeof value !== 'object') return;
  visitor(value, path);

  for (const [key, child] of Object.entries(value)) {
    if (key === 'availableTiles') continue;
    if (Array.isArray(child)) {
      child.forEach((entry, index) => walk(entry, visitor, `${path}.${key}[${index}]`));
    } else {
      walk(child, visitor, `${path}.${key}`);
    }
  }
}

function validateContent(content, path) {
  if (!content || typeof content !== 'object' || !content.type) return;

  if (!allowedContentTypes.has(content.type)) {
    addError(`${path}: unknown content type "${content.type}"`);
  }

  for (const id of content.morphemesLearned ?? []) {
    if (!allMorphemes[id]) {
      addError(`${path}: unknown morpheme id "${id}"`);
    }
  }

  if (content.objective) knownObjectives.add(content.objective);
  if (content.completionObjective) knownObjectives.add(content.completionObjective);

  if (content.type === 'narration' && !(content.lines ?? []).length) {
    addError(`${path}: narration needs at least one line`);
  }

  if (content.type === 'choice') {
    const steps = content.steps ?? [content];
    for (const [index, step] of steps.entries()) {
      const options = new Set((step.options ?? []).map((option) => option.id ?? option));
      if (!options.has(step.correctOptionId)) {
        addError(`${path}.steps[${index}]: correct option is not in options`);
      }
    }
  }

  if (content.type === 'builder' || content.type === 'conversation') {
    const steps = content.steps ?? [content];
    for (const [index, step] of steps.entries()) {
      const tiles = new Set((step.availableTiles ?? []).map((tile) => tile.id ?? tile));
      const tileIds = (step.availableTiles ?? []).map((tile) => tile.id ?? tile);
      const duplicateTileIds = findDuplicates(tileIds);
      const duplicateCorrectIds = findDuplicates(step.correctSequence ?? []);
      const stepPath = `${path}.steps[${index}]`;

      if (duplicateTileIds.length) {
        addError(`${stepPath}: duplicate tile id(s) ${duplicateTileIds.join(', ')}`);
      }

      if (duplicateCorrectIds.length) {
        addError(`${stepPath}: repeated correct tile "${duplicateCorrectIds[0]}" cannot be selected twice`);
      }

      if (
        step.slotCount !== undefined &&
        step.slotCount !== (step.correctSequence ?? []).length
      ) {
        addError(`${stepPath}: slotCount must match correct sequence length`);
      }

      for (const id of step.correctSequence ?? []) {
        if (!tiles.has(id)) {
          addError(`${stepPath}: correct tile "${id}" is not available`);
        }
      }
    }
  }

  if (content.type === 'sequence') {
    const entries = new Set((content.entries ?? []).map((entry) => entry.id));
    if ((content.entries ?? []).length !== (content.correctOrder ?? []).length) {
      addError(`${path}: correct order length must match entry count`);
    }

    for (const id of content.correctOrder ?? []) {
      if (!entries.has(id)) {
        addError(`${path}: sequence id "${id}" is not in entries`);
      }
    }
  }

  if (content.type === 'experiment') {
    const samples = new Set((content.samples ?? []).map((sample) => sample.id));
    const duplicateSamples = findDuplicates((content.samples ?? []).map((sample) => sample.id));
    if (duplicateSamples.length) {
      addError(`${path}: duplicate sample id(s) ${duplicateSamples.join(', ')}`);
    }

    if (!samples.has(content.correctSampleId)) {
      addError(`${path}: correct sample is not in samples`);
    }
  }
}

for (const [roomId, room] of Object.entries(roomConfigs)) {
  roomObjectiveIds.set(roomId, new Set());
  if (room.unlockedBy) normalizeList(room.unlockedBy).forEach((id) => knownObjectives.add(id));

  for (const direction of ['left', 'right', 'up', 'down']) {
    const neighborId = room[direction];
    if (neighborId && !roomConfigs[neighborId]) {
      addError(`${roomId}: ${direction} points to unknown room "${neighborId}"`);
    }
  }

  for (const hotspot of room.hotspots ?? []) {
    const path = `${roomId}.${hotspot.id}`;
    const contentObjective =
      hotspot.content?.objective ?? hotspot.content?.completionObjective;

    if (
      contentObjective &&
      hotspot.objective &&
      contentObjective !== hotspot.objective
    ) {
      addError(
        `${path}: hotspot objective "${hotspot.objective}" does not match content objective "${contentObjective}"`
      );
    }

    if (hotspot.objective) {
      if (hotspotObjectives.has(hotspot.objective)) {
        addError(`${path}: duplicate hotspot objective "${hotspot.objective}"`);
      }
      hotspotObjectives.add(hotspot.objective);
      knownObjectives.add(hotspot.objective);
    }

    if (contentObjective || hotspot.objective) {
      roomObjectiveIds.get(roomId).add(contentObjective ?? hotspot.objective);
    }

    validateContent(hotspot.content, `${path}.content`);
  }
}

for (const stage of stages) {
  if (!roomConfigs[stage.room]) {
    addError(`${stage.id}: room "${stage.room}" does not exist`);
  }

  if (stage.completionObjective) knownObjectives.add(stage.completionObjective);
  for (const id of stage.allObjectives ?? []) {
    knownObjectives.add(id);
    if (!roomObjectiveIds.get(stage.room)?.has(id)) {
      addError(`${stage.id}.allObjectives: objective "${id}" is not attached to a room hotspot`);
    }
  }
  walk(stage, (node, path) => validateContent(node, path), stage.id);
}

for (const [roomId, room] of Object.entries(roomConfigs)) {
  for (const required of normalizeList(room.unlockedBy)) {
    if (!knownObjectives.has(required)) {
      addError(`${roomId}: room unlock objective "${required}" is never defined`);
    }
  }

  for (const hotspot of room.hotspots ?? []) {
    for (const required of hotspot.requiresObjectives ?? []) {
      if (!knownObjectives.has(required)) {
        addError(`${roomId}.${hotspot.id}: required objective "${required}" is never defined`);
      }
    }
  }
}

if (errors.length) {
  console.error('Stage data validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Stage data validation passed.');

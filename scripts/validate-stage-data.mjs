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
  'matching',
  'narration',
  'prefix-wheel',
  'sequence',
]);

const errors = [];
const hotspotObjectives = new Set();
const knownObjectives = new Set();

function addError(message) {
  errors.push(message);
}

function normalizeList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
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
      for (const id of step.correctSequence ?? []) {
        if (!tiles.has(id)) {
          addError(`${path}.steps[${index}]: correct tile "${id}" is not available`);
        }
      }
    }
  }

  if (content.type === 'sequence') {
    const entries = new Set((content.entries ?? []).map((entry) => entry.id));
    for (const id of content.correctOrder ?? []) {
      if (!entries.has(id)) {
        addError(`${path}: sequence id "${id}" is not in entries`);
      }
    }
  }
}

for (const [roomId, room] of Object.entries(roomConfigs)) {
  if (room.unlockedBy) normalizeList(room.unlockedBy).forEach((id) => knownObjectives.add(id));

  for (const hotspot of room.hotspots ?? []) {
    const path = `${roomId}.${hotspot.id}`;

    if (hotspot.objective) {
      if (hotspotObjectives.has(hotspot.objective)) {
        addError(`${path}: duplicate hotspot objective "${hotspot.objective}"`);
      }
      hotspotObjectives.add(hotspot.objective);
      knownObjectives.add(hotspot.objective);
    }

    validateContent(hotspot.content, `${path}.content`);
  }
}

for (const stage of stages) {
  if (stage.completionObjective) knownObjectives.add(stage.completionObjective);
  for (const id of stage.allObjectives ?? []) knownObjectives.add(id);
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

import { getMorpheme } from './languageData';
import { stage1 } from './stages/stage1';
import { stage2 } from './stages/stage2';
import { stage3 } from './stages/stage3';
import { stage4 } from './stages/stage4';

const stages = [stage1, stage2, stage3, stage4];

function collectLearnedIds(value, ids = new Set()) {
  if (!value || typeof value !== 'object') return ids;

  for (const id of value.morphemesLearned ?? []) {
    const morpheme = getMorpheme(id);
    if (morpheme && morpheme.kind !== 'unknown') ids.add(id);
  }

  for (const child of Object.values(value)) {
    if (!child || typeof child !== 'object') continue;
    if (Array.isArray(child)) {
      child.forEach((entry) => collectLearnedIds(entry, ids));
    } else {
      collectLearnedIds(child, ids);
    }
  }

  return ids;
}

export const discoverableMorphemeIds = [...collectLearnedIds(stages)];
export const discoverableMorphemeCount = discoverableMorphemeIds.length;

import { getMorpheme } from './languageData';

export const KIND_ORDER = {
  pronoun: 0,
  prefix: 1,
  root: 2,
  suffix: 3,
  word: 4,
  unknown: 5,
};

export const KIND_LABELS = {
  pronoun: 'Pronouns',
  prefix: 'Prefixes',
  root: 'Roots',
  suffix: 'Suffixes',
  word: 'Full Words',
  unknown: 'Unresolved',
};

export function getVisibleMorphemeItems(learnedMorphemes) {
  const rawItems = [...learnedMorphemes]
    .map((id) => {
      const morpheme = getMorpheme(id);
      return morpheme ? { id, ...morpheme } : null;
    })
    .filter(Boolean);

  const resolvedBlahs = new Set(
    rawItems.filter((item) => item.kind !== 'unknown').map((item) => item.blah)
  );

  return rawItems
    .filter((item) => item.kind !== 'unknown' || !resolvedBlahs.has(item.blah))
    .sort((a, b) => {
      const ka = KIND_ORDER[a.kind] ?? 99;
      const kb = KIND_ORDER[b.kind] ?? 99;
      if (ka !== kb) return ka - kb;
      return a.blah.localeCompare(b.blah);
    });
}

export function groupMorphemeItems(items) {
  return items.reduce(
    (acc, item) => {
      acc[item.kind] = acc[item.kind] ?? [];
      acc[item.kind].push(item);
      return acc;
    },
    {
      pronoun: [],
      prefix: [],
      root: [],
      suffix: [],
      word: [],
      unknown: [],
    }
  );
}

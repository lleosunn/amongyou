export const roots = {
  ema: { blah: 'ema', english: 'mom' },
  eba: { blah: 'eba', english: 'dad' },
  il: { blah: 'il', english: 'I / me' },
  al: { blah: 'al', english: 'you (singular)' },
  el: { blah: 'el', english: 'they / them (singular)' },
  ol: { blah: 'ol', english: 'it' },
  ill: { blah: 'ill', english: 'we / us' },
  all: { blah: 'all', english: 'you (plural)' },
  ell: { blah: 'ell', english: 'they / them (plural)' },
  kume: { blah: 'kume', english: 'speak / say' },
  ramde: { blah: 'ramde', english: 'fly / pilot' },
  derbe: { blah: 'derbe', english: 'cure / heal' },
  gane: { blah: 'gane', english: 'lock' },
  moll: { blah: 'moll', english: 'fill' },
  sondy: { blah: 'sondy', english: 'surgery' },
};

export const prefixes = {
  'op-': { blah: 'op-', english: 'un-' },
  'a-': { blah: 'a-', english: 'pre-' },
  'me-': { blah: 'me-', english: 'post-' },
  'pua-': { blah: 'pua-', english: 'anti-' },
  'ya-': { blah: 'ya-', english: 're-' },
  'gan-': { blah: 'gan-', english: 'hyper-' },
  'gon-': { blah: 'gon-', english: 'hypo-' },
  'te-': { blah: 'te-', english: 'multi-' },
};

export const suffixes = {
  '-plum': { blah: '-plum', english: '-able' },
  '-nu': { blah: '-nu', english: '-er (person who does ___)' },
  '-uk': { blah: '-uk', english: '-ed' },
};

export const allMorphemes = {
  ...Object.fromEntries(
    Object.entries(roots).map(([k, v]) => [k, { ...v, kind: 'root' }])
  ),
  ...Object.fromEntries(
    Object.entries(prefixes).map(([k, v]) => [k, { ...v, kind: 'prefix' }])
  ),
  ...Object.fromEntries(
    Object.entries(suffixes).map(([k, v]) => [k, { ...v, kind: 'suffix' }])
  ),
};

export function getMorpheme(id) {
  return allMorphemes[id] ?? null;
}

export function translate(morphemeIds) {
  return morphemeIds
    .map((id) => getMorpheme(id))
    .filter(Boolean)
    .map((m) => m.english)
    .join(' ');
}

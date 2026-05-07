export const pronouns = {
  il: { blah: 'il', english: 'I / me' },
  al: { blah: 'al', english: 'you' },
  el: { blah: 'el', english: 'they / them (singular)' },
  ol: { blah: 'ol', english: 'it' },
  ill: { blah: 'ill', english: 'we / us' },
  all: { blah: 'all', english: 'you (plural)' },
  ell: { blah: 'ell', english: 'they / them (plural)' },
};

export const roots = {
  rom: { blah: 'rom', english: 'planet' },
  doda: { blah: 'doda', english: 'water' },
  carda: { blah: 'carda', english: 'virus' },
  ema: { blah: 'ema', english: 'mom' },
  eba: { blah: 'eba', english: 'dad' },
  kume: { blah: 'kume', english: 'speak / say' },
  ramde: { blah: 'ramde', english: 'fly / go' },
  derbe: { blah: 'derbe', english: 'heal / cure' },
  gane: { blah: 'gane', english: 'lock' },
  moll: { blah: 'moll', english: 'fill' },
  sondy: { blah: 'sondy', english: 'surgery / treatment' },
  cruta: { blah: 'cruta', english: 'science / lab work' },
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
  '-nu': { blah: '-nu', english: '-er (person who does ___)' },
  '-uk': { blah: '-uk', english: '-ed / already happened' },
  '-mar': { blah: '-mar', english: '-ery / place' },
};

export const fullWords = {
  opgane: { blah: 'opgane', english: 'unlock' },
  puacarda: { blah: 'puacarda', english: 'antiviral medicine' },
  yamoll: { blah: 'yamoll', english: 'refill' },
  desarom: { blah: 'desarom', english: 'Mars / red planet' },
  dodarom: { blah: 'dodarom', english: 'Earth / water planet' },
  ramdenu: { blah: 'ramdenu', english: 'pilot' },
  derbenu: { blah: 'derbenu', english: 'doctor / medic' },
  derbemar: { blah: 'derbemar', english: 'clinic' },
  crutamar: { blah: 'crutamar', english: 'lab / factory' },
};

export const unknownWords = {
  puacardaSeen: { blah: 'puacarda', english: '???' },
};

function withKind(items, kind) {
  return Object.fromEntries(
    Object.entries(items).map(([id, value]) => [id, { ...value, kind }])
  );
}

export const allMorphemes = {
  ...withKind(pronouns, 'pronoun'),
  ...withKind(prefixes, 'prefix'),
  ...withKind(roots, 'root'),
  ...withKind(suffixes, 'suffix'),
  ...withKind(fullWords, 'word'),
  ...withKind(unknownWords, 'unknown'),
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

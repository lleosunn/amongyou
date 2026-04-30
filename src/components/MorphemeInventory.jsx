import { useEffect, useMemo, useRef, useState } from 'react';
import { useGameState } from '../gameContext';
import { discoverableMorphemeCount } from '../discoverableMorphemes';
import { getMorpheme } from '../languageData';
import './MorphemeInventory.css';

const KIND_ORDER = {
  pronoun: 0,
  prefix: 1,
  root: 2,
  suffix: 3,
  word: 4,
  unknown: 5,
};

const KIND_LABELS = {
  pronoun: 'Pronouns',
  prefix: 'Prefixes',
  root: 'Roots',
  suffix: 'Suffixes',
  word: 'Full Words',
  unknown: 'Unresolved',
};

export default function MorphemeInventory() {
  const { learnedMorphemes } = useGameState();
  const [open, setOpen] = useState(false);
  const [recentIds, setRecentIds] = useState(new Set());
  const prevIdsRef = useRef(new Set());

  const rawItems = [...learnedMorphemes]
    .map((id) => {
      const morpheme = getMorpheme(id);
      return morpheme ? { id, ...morpheme } : null;
    })
    .filter(Boolean);

  const resolvedBlahs = new Set(
    rawItems.filter((item) => item.kind !== 'unknown').map((item) => item.blah)
  );

  const items = rawItems
    .filter((item) => item.kind !== 'unknown' || !resolvedBlahs.has(item.blah))
    .sort((a, b) => {
      const ka = KIND_ORDER[a.kind] ?? 99;
      const kb = KIND_ORDER[b.kind] ?? 99;
      if (ka !== kb) return ka - kb;
      return a.blah.localeCompare(b.blah);
    });

  const grouped = useMemo(
    () =>
      items.reduce(
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
      ),
    [items]
  );

  const learnedCount = items.filter((item) => item.kind !== 'unknown').length;

  useEffect(() => {
    const prev = prevIdsRef.current;
    const current = new Set(learnedMorphemes);
    const added = [...current].filter((id) => !prev.has(id));
    prevIdsRef.current = current;
    if (!added.length) return;

    setRecentIds(new Set(added));
    const timeout = setTimeout(() => setRecentIds(new Set()), 1200);
    return () => clearTimeout(timeout);
  }, [learnedMorphemes]);

  return (
    <div className={`morpheme-inventory ${open ? 'open' : 'collapsed'}`}>
      <button
        className="morpheme-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Collapse word list' : 'Expand word list'}
      >
        <span className="morpheme-title">
          Words: {learnedCount}/{discoverableMorphemeCount}
        </span>
        <span className="morpheme-chevron">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="morpheme-list">
          {items.length === 0 ? (
            <p className="morpheme-empty">No words learned yet.</p>
          ) : (
            Object.entries(grouped)
              .filter(([, list]) => list.length)
              .map(([kind, list]) => (
                <div key={kind} className="morpheme-group">
                  <div className="morpheme-group-title">
                    {KIND_LABELS[kind] ?? kind}
                  </div>
                  {list.map((m) => (
                    <div
                      key={m.id}
                      className={`morpheme-row morpheme-${m.kind} ${
                        recentIds.has(m.id) ? 'is-new' : ''
                      }`}
                    >
                      <span
                        className={`morpheme-kind morpheme-kind-${m.kind}`}
                        aria-hidden="true"
                      >
                        {m.kind.charAt(0).toUpperCase()}
                      </span>
                      <span className="morpheme-blah">{m.blah}</span>
                      <span className="morpheme-equals">=</span>
                      <span className="morpheme-english">{m.english}</span>
                    </div>
                  ))}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

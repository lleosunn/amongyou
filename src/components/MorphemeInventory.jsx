import { useEffect, useMemo, useRef, useState } from 'react';
import { useGameState } from '../gameContext';
import { allMorphemes, getMorpheme } from '../languageData';
import './MorphemeInventory.css';

const KIND_ORDER = { prefix: 0, root: 1, suffix: 2 };

export default function MorphemeInventory() {
  const { learnedMorphemes } = useGameState();
  const [open, setOpen] = useState(false);
  const [recentIds, setRecentIds] = useState(new Set());
  const prevIdsRef = useRef(new Set());
  const totalCount = Object.keys(allMorphemes).length;

  const items = [...learnedMorphemes]
    .map((id) => {
      const morpheme = getMorpheme(id);
      return morpheme ? { id, ...morpheme } : null;
    })
    .filter(Boolean)
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
        { prefix: [], root: [], suffix: [] }
      ),
    [items]
  );

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
          Words: {items.length}/{totalCount}
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
                    {kind.charAt(0).toUpperCase() + kind.slice(1)}s
                  </div>
                  {list.map((m) => (
                    <div
                      key={m.id}
                      className={`morpheme-row morpheme-${m.kind} ${recentIds.has(m.id) ? 'is-new' : ''
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

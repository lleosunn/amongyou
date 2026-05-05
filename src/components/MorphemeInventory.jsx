import { useEffect, useMemo, useRef, useState } from 'react';
import { useGameState } from '../gameContext';
import { discoverableMorphemeCount } from '../discoverableMorphemes';
import {
  getVisibleMorphemeItems,
  groupMorphemeItems,
  KIND_LABELS,
} from '../morphemeDisplay';
import './MorphemeInventory.css';

export default function MorphemeInventory() {
  const { learnedMorphemes } = useGameState();
  const [open, setOpen] = useState(false);
  const [recentIds, setRecentIds] = useState(new Set());
  const prevIdsRef = useRef(new Set());

  const items = getVisibleMorphemeItems(learnedMorphemes);

  const grouped = useMemo(
    () => groupMorphemeItems(items),
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

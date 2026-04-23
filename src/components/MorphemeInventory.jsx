import { useState } from 'react';
import { useGameState } from '../gameContext';
import { getMorpheme } from '../languageData';
import './MorphemeInventory.css';

const KIND_ORDER = { prefix: 0, root: 1, suffix: 2 };

export default function MorphemeInventory() {
  const { learnedMorphemes } = useGameState();
  const [open, setOpen] = useState(true);

  const items = [...learnedMorphemes]
    .map((id) => getMorpheme(id))
    .filter(Boolean)
    .sort((a, b) => {
      const ka = KIND_ORDER[a.kind] ?? 99;
      const kb = KIND_ORDER[b.kind] ?? 99;
      if (ka !== kb) return ka - kb;
      return a.blah.localeCompare(b.blah);
    });

  return (
    <div className={`morpheme-inventory ${open ? 'open' : 'collapsed'}`}>
      <button
        className="morpheme-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Collapse word list' : 'Expand word list'}
      >
        <span className="morpheme-title">
          Words Learned <span className="morpheme-count">{items.length}</span>
        </span>
        <span className="morpheme-chevron">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="morpheme-list">
          {items.length === 0 ? (
            <p className="morpheme-empty">No words learned yet.</p>
          ) : (
            items.map((m) => (
              <div key={m.blah} className={`morpheme-row morpheme-${m.kind}`}>
                <span className="morpheme-blah">{m.blah}</span>
                <span className="morpheme-arrow">→</span>
                <span className="morpheme-english">{m.english}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

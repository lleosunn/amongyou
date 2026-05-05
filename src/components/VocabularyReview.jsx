import { useMemo } from 'react';
import { useGameState } from '../gameContext';
import {
  getVisibleMorphemeItems,
  groupMorphemeItems,
  KIND_LABELS,
} from '../morphemeDisplay';
import './VocabularyReview.css';

export default function VocabularyReview({ title, message, onComplete }) {
  const { learnedMorphemes } = useGameState();
  const items = getVisibleMorphemeItems(learnedMorphemes);
  const grouped = useMemo(() => groupMorphemeItems(items), [items]);

  return (
    <div className="vocabulary-review">
      {title && <h2 className="vocabulary-title">{title}</h2>}
      {message && <p className="vocabulary-message">{message}</p>}

      <div className="vocabulary-list">
        {items.length === 0 ? (
          <p className="vocabulary-empty">No words learned yet.</p>
        ) : (
          Object.entries(grouped)
            .filter(([, list]) => list.length)
            .map(([kind, list]) => (
              <section key={kind} className="vocabulary-group">
                <h3>{KIND_LABELS[kind] ?? kind}</h3>
                <div className="vocabulary-rows">
                  {list.map((morpheme) => (
                    <div
                      key={morpheme.id}
                      className={`vocabulary-row vocabulary-${morpheme.kind}`}
                    >
                      <span className="vocabulary-kind" aria-hidden="true">
                        {morpheme.kind.charAt(0).toUpperCase()}
                      </span>
                      <span className="vocabulary-blah">{morpheme.blah}</span>
                      <span className="vocabulary-equals">=</span>
                      <span className="vocabulary-english">
                        {morpheme.english}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))
        )}
      </div>

      <button className="vocabulary-continue" onClick={onComplete}>
        Continue
      </button>
    </div>
  );
}

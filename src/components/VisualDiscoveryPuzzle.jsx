import { useEffect, useRef, useState } from 'react';
import { getPuzzleAsset } from '../puzzleAssets';
import './VisualDiscoveryPuzzle.css';

function sameSelection(selectedIds, correctIds) {
  if (selectedIds.length !== correctIds.length) return false;
  const selected = new Set(selectedIds);
  return correctIds.every((id) => selected.has(id));
}

export default function VisualDiscoveryPuzzle({ title, instructions, steps = [], onSolve }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [advancing, setAdvancing] = useState(false);
  const [solved, setSolved] = useState(false);
  const timeoutRef = useRef(null);

  const step = steps[stepIndex] ?? steps[0];
  const correctIds = step?.correctPartIds ?? [];
  const isLast = stepIndex >= steps.length - 1;

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const resetStep = () => {
    setSelectedIds([]);
    setFeedback(null);
    setAdvancing(false);
  };

  const moveNext = () => {
    if (isLast) {
      setSolved(true);
      timeoutRef.current = setTimeout(() => onSolve?.(), 900);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((current) => current + 1);
      resetStep();
    }, 900);
  };

  const choosePart = (partId) => {
    if (!step || advancing || solved) return;

    const nextSelection = selectedIds.includes(partId)
      ? selectedIds.filter((id) => id !== partId)
      : [...selectedIds, partId];

    setSelectedIds(nextSelection);
    setFeedback(null);

    if (nextSelection.length < correctIds.length) return;

    if (!sameSelection(nextSelection, correctIds)) {
      setAdvancing(true);
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That pattern does not fit the pictures.',
      });
      timeoutRef.current = setTimeout(resetStep, 850);
      return;
    }

    setAdvancing(true);
    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'That pattern fits.',
    });
    moveNext();
  };

  if (!step) return null;

  return (
    <div className="visual-discovery">
      {title && <h2 className="visual-title">{title}</h2>}
      {instructions && <p className="visual-instructions">{instructions}</p>}

      <p className="visual-prompt">{step.prompt}</p>

      <div className="visual-card-grid">
        {(step.cards ?? []).map((card) => {
          const image = getPuzzleAsset(card.imageKey);

          return (
            <article key={card.id} className="visual-card">
              <div
                className={`visual-picture visual-picture-${card.visual} ${
                  image ? 'has-image' : ''
                }`}
                aria-hidden="true"
              >
                {image ? (
                  <img className="visual-image" src={image} alt="" />
                ) : (
                  <>
                    <span className="visual-orbit" />
                    <span className="visual-figure" />
                    <span className="visual-tool" />
                  </>
                )}
              </div>
              <div className="visual-card-copy">
                <h3>{card.title}</h3>
                {card.caption && <p>{card.caption}</p>}
              </div>
              <div className="visual-label" aria-label={card.label}>
                {(card.labelParts ?? []).map((part) => (
                  <button
                    key={part.id}
                    className={`visual-part ${
                      selectedIds.includes(part.id) ? 'selected' : ''
                    }`}
                    onClick={() => choosePart(part.id)}
                    disabled={advancing || solved}
                    aria-label={`Select ${part.text} from ${card.label}`}
                  >
                    {part.text}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {feedback && (
        <p
          className={`visual-feedback visual-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}

      {steps.length > 1 && (
        <div className="visual-progress">
          {stepIndex + 1} / {steps.length}
        </div>
      )}
    </div>
  );
}

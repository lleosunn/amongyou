import { useEffect, useRef, useState } from 'react';
import './BuilderPuzzle.css';

function normalizeTile(tile) {
  if (typeof tile === 'string') return { id: tile, label: tile };
  return tile;
}

function makeStep({
  title,
  instructions,
  prompt,
  availableTiles,
  correctSequence,
  slotCount,
  successMessage,
  wrongMessage,
}) {
  return {
    title,
    instructions,
    prompt,
    availableTiles,
    correctSequence,
    slotCount,
    successMessage,
    wrongMessage,
  };
}

export default function BuilderPuzzle(props) {
  const stepList =
    props.steps?.length > 0 ? props.steps : [makeStep(props)];
  const [stepIndex, setStepIndex] = useState(0);
  const [placements, setPlacements] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(false);
  const timeoutRef = useRef(null);

  const step = stepList[stepIndex] ?? stepList[0];
  const tiles = (step.availableTiles ?? []).map(normalizeTile);
  const correctSequence = step.correctSequence ?? [];
  const slotCount = step.slotCount ?? correctSequence.length;
  const usedIds = new Set(placements.filter(Boolean).map((tile) => tile.id));
  const title = step.title ?? props.title;
  const instructions = step.instructions ?? props.instructions;
  const isLast = stepIndex >= stepList.length - 1;
  const phrase = Array.from({ length: slotCount }, (_, i) => placements[i]?.label)
    .filter(Boolean)
    .join(' ');
  const canSubmit =
    !solved &&
    Array.from({ length: slotCount }, (_, i) => Boolean(placements[i])).every(
      Boolean
    );

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const placeTile = (tile) => {
    if (solved) return;
    const nextIndex = placements.findIndex((entry) => !entry);
    const openIndex = nextIndex === -1 ? placements.length : nextIndex;
    if (openIndex >= slotCount) return;

    setPlacements((prev) => {
      const next = [...prev];
      next[openIndex] = tile;
      return next;
    });
    setFeedback(null);
  };

  const clearSlot = (index) => {
    if (solved) return;
    setPlacements((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setFeedback(null);
  };

  const resetStep = () => {
    setPlacements([]);
    setFeedback(null);
  };

  const submit = () => {
    if (!canSubmit) return;
    const actual = Array.from({ length: slotCount }, (_, i) => placements[i]?.id);
    const correct =
      actual.length === correctSequence.length &&
      actual.every((id, i) => id === correctSequence[i]);

    if (!correct) {
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'The machine rejects that phrase.',
      });
      return;
    }

    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'Accepted.',
    });

    if (isLast) {
      setSolved(true);
      timeoutRef.current = setTimeout(() => props.onSolve?.(), 900);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((i) => i + 1);
      resetStep();
    }, 850);
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return;
    if (event.target instanceof HTMLButtonElement) return;
    submit();
  };

  return (
    <div
      className={`builder-puzzle ${
        feedback ? `builder-has-${feedback.type}` : ''
      }`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {title && <h2 className="builder-title">{title}</h2>}
      {instructions && <p className="builder-instructions">{instructions}</p>}
      {step.prompt && <p className="builder-prompt">{step.prompt}</p>}

      <div className="builder-slots" style={{ '--slot-count': slotCount }}>
        {Array.from({ length: slotCount }, (_, index) => {
          const tile = placements[index];
          return (
            <button
              key={index}
              className={`builder-slot ${tile ? 'filled' : ''}`}
              onClick={() => clearSlot(index)}
              aria-label={`Slot ${index + 1}`}
            >
              {tile?.label ?? ''}
            </button>
          );
        })}
      </div>

      <div className="builder-preview" aria-live="polite">
        {phrase || 'Build a phrase from the tiles.'}
      </div>

      <div className="builder-tiles">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className="builder-tile"
            onClick={() => placeTile(tile)}
            disabled={usedIds.has(tile.id) || solved}
          >
            {tile.label}
          </button>
        ))}
      </div>

      <div className="builder-actions">
        <button className="builder-secondary" onClick={resetStep} disabled={solved}>
          Clear
        </button>
        <button
          className="builder-submit"
          onClick={submit}
          disabled={!canSubmit}
        >
          Test
        </button>
      </div>

      {feedback && (
        <p
          className={`builder-feedback builder-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}

      {stepList.length > 1 && (
        <div className="builder-progress">
          {stepIndex + 1} / {stepList.length}
        </div>
      )}
    </div>
  );
}

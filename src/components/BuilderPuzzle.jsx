import { useEffect, useRef, useState } from 'react';
import PuzzleClueCards from './PuzzleClueCards';
import './BuilderPuzzle.css';

function normalizeTile(tile) {
  if (typeof tile === 'string') return { id: tile, label: tile };
  return tile;
}

function combineCopy(...parts) {
  return parts.filter(Boolean).join(' ');
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
  clues,
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
    clues,
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
  const clues = step.clues ?? props.clues ?? [];
  const isLast = stepIndex >= stepList.length - 1;
  const phrase = Array.from({ length: slotCount }, (_, i) => placements[i]?.label)
    .filter(Boolean)
    .join(' ');
  const canSubmit =
    !solved &&
    Array.from({ length: slotCount }, (_, i) => Boolean(placements[i])).every(
      Boolean
    );
  const leadCopy = combineCopy(instructions, step.prompt);

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

  const movePlacement = (fromIndex, toIndex) => {
    if (solved || fromIndex === toIndex) return;

    setPlacements((prev) => {
      const next = [...prev];
      const moving = next[fromIndex];
      next[fromIndex] = next[toIndex] ?? null;
      next[toIndex] = moving ?? null;
      return next;
    });
    setFeedback(null);
  };

  const dropTile = (event, slotIndex) => {
    event.preventDefault();
    if (solved) return;

    const sourceSlot = event.dataTransfer.getData('application/x-builder-slot');
    if (sourceSlot !== '') {
      movePlacement(Number(sourceSlot), slotIndex);
      return;
    }

    const tileId = event.dataTransfer.getData('text/plain');
    const tile = tiles.find((entry) => entry.id === tileId);
    if (!tile || usedIds.has(tile.id)) return;

    setPlacements((prev) => {
      const next = [...prev];
      next[slotIndex] = tile;
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
      {leadCopy && <p className="builder-instructions">{leadCopy}</p>}
      <PuzzleClueCards clues={clues} />

      <div className="builder-slots" style={{ '--slot-count': slotCount }}>
        {Array.from({ length: slotCount }, (_, index) => {
          const tile = placements[index];
          return (
            <button
              key={index}
              className={`builder-slot ${tile ? 'filled' : ''}`}
              draggable={Boolean(tile) && !solved}
              onDragStart={(event) => {
                if (!tile) return;
                event.dataTransfer.setData('application/x-builder-slot', String(index));
                event.dataTransfer.effectAllowed = 'move';
              }}
              onDragOver={(event) => {
                if (!solved) event.preventDefault();
              }}
              onDrop={(event) => dropTile(event, index)}
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
            draggable={!usedIds.has(tile.id) && !solved}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', tile.id);
              event.dataTransfer.effectAllowed = 'move';
            }}
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

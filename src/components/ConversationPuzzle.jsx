import { useEffect, useRef, useState } from 'react';
import PuzzleClueCards from './PuzzleClueCards';
import './ConversationPuzzle.css';

function normalizeTile(tile) {
  if (typeof tile === 'string') return { id: tile, label: tile };
  return tile;
}

function combineCopy(...parts) {
  return parts.filter(Boolean).join(' ');
}

function makeCorrectPlacements(step) {
  const tiles = (step?.availableTiles ?? []).map(normalizeTile);
  return (step?.correctSequence ?? []).map(
    (id) => tiles.find((tile) => tile.id === id) ?? { id, label: id }
  );
}

function makeSolvedPhrase(step) {
  return makeCorrectPlacements(step)
    .map((tile) => tile.label)
    .join(' ');
}

function makeSolvedHistory(steps) {
  return steps.flatMap((step) => [
    { speaker: 'Alien', text: step.alien },
    { speaker: 'You', text: makeSolvedPhrase(step) },
    ...(step.reply ? [{ speaker: 'Alien', text: step.reply }] : []),
  ]);
}

function getWrongFeedbackText(step, attemptCount) {
  const hintAfterAttempts = step?.hintAfterAttempts ?? 5;

  if (step?.attemptHint && attemptCount >= hintAfterAttempts) {
    return step.attemptHint;
  }

  return step?.wrongMessage ?? 'The commander waits. That did not land.';
}

export default function ConversationPuzzle({
  title,
  instructions,
  steps = [],
  initiallySolved = false,
  onSolve,
}) {
  const initialStepIndex = initiallySolved ? Math.max(0, steps.length - 1) : 0;
  const initialStep = steps[initialStepIndex] ?? steps[0];
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [placements, setPlacements] = useState(() =>
    initiallySolved ? makeCorrectPlacements(initialStep) : []
  );
  const [feedback, setFeedback] = useState(() =>
    initiallySolved
      ? {
          type: 'success',
          text: initialStep?.successMessage ?? 'Message accepted.',
        }
      : null
  );
  const [history, setHistory] = useState(() =>
    initiallySolved ? makeSolvedHistory(steps) : []
  );
  const [solved, setSolved] = useState(initiallySolved);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const timeoutRef = useRef(null);
  const logRef = useRef(null);

  const step = steps[stepIndex] ?? steps[0];
  const tiles = (step?.availableTiles ?? []).map(normalizeTile);
  const correctSequence = step?.correctSequence ?? [];
  const slotCount = step?.slotCount ?? correctSequence.length;
  const usedIds = new Set(placements.filter(Boolean).map((tile) => tile.id));
  const isLast = stepIndex >= steps.length - 1;
  const clues =
    step?.clues ??
    (step?.sceneImageKey
      ? [
          {
            id: step.sceneImageKey,
            title: step.sceneTitle,
            caption: step.sceneCaption,
            imageKey: step.sceneImageKey,
          },
        ]
      : []);
  const phrase = Array.from({ length: slotCount }, (_, i) => placements[i]?.label)
    .filter(Boolean)
    .join(' ');
  const canSubmit =
    !solved &&
    Array.from({ length: slotCount }, (_, i) => Boolean(placements[i])).every(
      Boolean
    );
  const leadCopy = combineCopy(instructions, solved ? null : step?.prompt);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (!logRef.current) return;
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [history, stepIndex]);

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

    const sourceSlot = event.dataTransfer.getData('application/x-conversation-slot');
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

  const reset = () => {
    setPlacements([]);
    setFeedback(null);
  };

  const submit = () => {
    if (!canSubmit || !step) return;
    const actual = Array.from({ length: slotCount }, (_, i) => placements[i]?.id);
    const correct =
      actual.length === correctSequence.length &&
      actual.every((id, i) => id === correctSequence[i]);

    if (!correct) {
      const nextWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(nextWrongAttempts);
      setFeedback({
        type: 'wrong',
        text: getWrongFeedbackText(step, nextWrongAttempts),
      });
      return;
    }

    const phrase = placements
      .filter(Boolean)
      .map((tile) => tile.label)
      .join(' ');

    setHistory((prev) => [
      ...prev,
      { speaker: 'Alien', text: step.alien },
      { speaker: 'You', text: phrase },
      ...(step.reply ? [{ speaker: 'Alien', text: step.reply }] : []),
    ]);

    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'Message accepted.',
    });

    if (isLast) {
      setSolved(true);
      onSolve?.();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((i) => i + 1);
      setWrongAttempts(0);
      reset();
    }, 900);
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter') return;
    if (event.target instanceof HTMLButtonElement) return;
    submit();
  };

  if (!step) return null;

  return (
    <div
      className={`conversation-puzzle ${
        feedback ? `conversation-has-${feedback.type}` : ''
      }`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {title && <h2 className="conversation-title">{title}</h2>}
      {leadCopy && <p className="conversation-instructions">{leadCopy}</p>}

      <div className="conversation-log" ref={logRef}>
        {history.map((entry, index) => (
          <div
            key={`${entry.speaker}-${index}`}
            className={`conversation-line ${
              entry.speaker === 'You' ? 'from-player' : 'from-alien'
            }`}
          >
            <span className="conversation-speaker">{entry.speaker}</span>
            <span className="conversation-text">{entry.text}</span>
          </div>
        ))}
        {!solved && (
          <div className="conversation-line from-alien active">
            <span className="conversation-speaker">Alien</span>
            <span className="conversation-text">{step.alien}</span>
          </div>
        )}
      </div>

      {!solved && (
        <>
          <PuzzleClueCards clues={clues} />

          <div className="conversation-slots" style={{ '--slot-count': slotCount }}>
            {Array.from({ length: slotCount }, (_, index) => {
              const tile = placements[index];
              return (
                <button
                  key={index}
                  className={`conversation-slot ${tile ? 'filled' : ''}`}
                  draggable={Boolean(tile) && !solved}
                  onDragStart={(event) => {
                    if (!tile) return;
                    event.dataTransfer.setData(
                      'application/x-conversation-slot',
                      String(index)
                    );
                    event.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragOver={(event) => {
                    if (!solved) event.preventDefault();
                  }}
                  onDrop={(event) => dropTile(event, index)}
                  onClick={() => clearSlot(index)}
                  aria-label={`Response slot ${index + 1}`}
                >
                  {tile?.label ?? ''}
                </button>
              );
            })}
          </div>

          <div className="conversation-preview" aria-live="polite">
            {phrase || 'Build your response.'}
          </div>

          <div className="conversation-tiles">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                className="conversation-tile"
                draggable={!usedIds.has(tile.id)}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', tile.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => placeTile(tile)}
                disabled={usedIds.has(tile.id)}
              >
                {tile.label}
              </button>
            ))}
          </div>

          <div className="conversation-actions">
            <button className="conversation-secondary" onClick={reset}>
              Clear
            </button>
            <button
              className="conversation-submit"
              onClick={submit}
              disabled={!canSubmit}
            >
              Send
            </button>
          </div>
        </>
      )}

      {feedback && (
        <p
          className={`conversation-feedback conversation-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}

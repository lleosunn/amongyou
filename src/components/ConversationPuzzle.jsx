import { useEffect, useRef, useState } from 'react';
import PuzzleClueCards from './PuzzleClueCards';
import './ConversationPuzzle.css';

function normalizeTile(tile) {
  if (typeof tile === 'string') return { id: tile, label: tile };
  return tile;
}

export default function ConversationPuzzle({ title, instructions, steps = [], onSolve }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [placements, setPlacements] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]);
  const [solved, setSolved] = useState(false);
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
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'The commander waits. That did not land.',
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
      timeoutRef.current = setTimeout(() => onSolve?.(), 1000);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((i) => i + 1);
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
      {instructions && (
        <p className="conversation-instructions">{instructions}</p>
      )}

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
          {step.prompt && <p className="conversation-prompt">{step.prompt}</p>}

          <div className="conversation-slots" style={{ '--slot-count': slotCount }}>
            {Array.from({ length: slotCount }, (_, index) => {
              const tile = placements[index];
              return (
                <button
                  key={index}
                  className={`conversation-slot ${tile ? 'filled' : ''}`}
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

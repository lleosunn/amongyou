import { useCallback, useState } from 'react';
import './SequencePuzzle.css';

const REPLAY_STEP_MS = 1800;

function makeInitialOrder(entries, correctOrder) {
  const order = entries.map((e) => e.id);

  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const startsSolved = order.every((id, i) => id === correctOrder[i]);
  if (startsSolved && order.length > 1) {
    [order[0], order[1]] = [order[1], order[0]];
  }

  return order;
}

export default function SequencePuzzle({
  title,
  instructions,
  entries = [],
  correctOrder = [],
  replaySteps = [],
  onSolve,
}) {
  const [order, setOrder] = useState(() =>
    makeInitialOrder(entries, correctOrder)
  );
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [replaying, setReplaying] = useState(false);
  const [replayIndex, setReplayIndex] = useState(-1);
  const [solved, setSolved] = useState(false);

  const swap = useCallback(
    (i) => {
      if (solved || replaying) return;

      if (selected === null) {
        setSelected(i);
        return;
      }

      if (selected === i) {
        setSelected(null);
        return;
      }

      setOrder((prev) => {
        const next = [...prev];
        [next[selected], next[i]] = [next[i], next[selected]];
        return next;
      });
      setSelected(null);
      setFeedback(null);
    },
    [selected, solved, replaying]
  );

  const moveUp = (i) => {
    if (i === 0 || solved || replaying) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
    setFeedback(null);
  };

  const moveDown = (i) => {
    if (i === order.length - 1 || solved || replaying) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[i + 1], next[i]] = [next[i], next[i + 1]];
      return next;
    });
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (solved || replaying) return;
    const isCorrect = order.every((id, i) => id === correctOrder[i]);

    if (!isCorrect) {
      setFeedback({
        type: 'wrong',
        text: 'System replay failed — the sequence doesn\'t match the logs. Try again.',
      });
      return;
    }

    setFeedback({ type: 'success', text: 'Sequence verified. Initiating replay...' });
    setReplaying(true);
    setReplayIndex(0);

    replaySteps.forEach((_, i) => {
      setTimeout(() => {
        setReplayIndex(i);
      }, i * REPLAY_STEP_MS);
    });

    setTimeout(() => {
      setSolved(true);
      setReplaying(false);
      setTimeout(() => onSolve?.(), 600);
    }, replaySteps.length * REPLAY_STEP_MS);
  };

  const entryMap = Object.fromEntries(entries.map((e) => [e.id, e]));

  return (
    <div className="sequence-puzzle">
      {title && <h2 className="seq-title">{title}</h2>}
      {instructions && <p className="seq-instructions">{instructions}</p>}

      <div className="seq-entries">
        {order.map((id, i) => {
          const entry = entryMap[id];
          return (
            <div
              key={id}
              className={`seq-entry ${selected === i ? 'selected' : ''} ${
                solved ? 'locked' : ''
              }`}
              onClick={() => swap(i)}
            >
              <span className="seq-num">{i + 1}</span>
              <div className="seq-entry-body">
                <span className="seq-blah">{entry.blah}</span>
                {entry.hint && <span className="seq-hint">{entry.hint}</span>}
              </div>
              {!solved && !replaying && (
                <div className="seq-reorder">
                  <button
                    className="seq-move"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveUp(i);
                    }}
                    disabled={i === 0}
                    aria-label="Move up"
                  >
                    ▲
                  </button>
                  <button
                    className="seq-move"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveDown(i);
                    }}
                    disabled={i === order.length - 1}
                    aria-label="Move down"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {replaying && replaySteps.length > 0 && (
        <div className="seq-replay">
          <div className="seq-replay-header">SYSTEM REPLAY</div>
          <div className="seq-replay-steps">
            {replaySteps.map((step, i) => (
              <div
                key={i}
                className={`seq-replay-step ${
                  i < replayIndex ? 'past' : ''
                } ${i === replayIndex ? 'active' : ''} ${
                  i > replayIndex ? 'future' : ''
                }`}
              >
                <span className="seq-replay-icon">{step.icon}</span>
                <span className="seq-replay-text">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!replaying && !solved && (
        <button className="seq-submit" onClick={handleSubmit}>
          Run Replay
        </button>
      )}

      {solved && (
        <div className="seq-solved">
          <p>Replay complete. You now understand the sequence of events.</p>
        </div>
      )}

      {feedback && !replaying && (
        <p className={`seq-feedback seq-feedback-${feedback.type}`}>
          {feedback.text}
        </p>
      )}
    </div>
  );
}

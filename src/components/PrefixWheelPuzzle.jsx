import { useState } from 'react';
import './PrefixWheelPuzzle.css';

export default function PrefixWheelPuzzle({
  title,
  instructions,
  rootWord,
  suffix = '',
  prefixes = [],
  correctPrefixId,
  onSolve,
  wrongMessage = 'The door stays shut. That combination does nothing.',
  successMessage = 'The door hisses and slides open.',
}) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [solved, setSolved] = useState(false);

  const current = prefixes[index] ?? { id: '', blah: '' };
  const needsPrefixSeparator = current.blah && !current.blah.endsWith('-');

  const cycle = (dir) => {
    if (solved || prefixes.length === 0) return;
    setFeedback(null);
    setIndex((i) => (i + dir + prefixes.length) % prefixes.length);
  };

  const handleTry = () => {
    if (solved) return;
    if (current.id === correctPrefixId) {
      setSolved(true);
      setFeedback({ type: 'success', text: successMessage });
      setTimeout(() => onSolve?.(), 1400);
    } else {
      setFeedback({ type: 'wrong', text: wrongMessage });
    }
  };

  return (
    <div className="prefix-wheel">
      {title && <h2 className="pw-title">{title}</h2>}
      {instructions && <p className="pw-instructions">{instructions}</p>}

      <div className={`pw-door ${solved ? 'pw-door-open' : ''}`}>
        <div className="pw-door-frame">
          <div className="pw-door-panel pw-door-left" />
          <div className="pw-door-panel pw-door-right" />
          <div className="pw-door-seam" />
        </div>
        <div className="pw-display">
          <div className="pw-display-screen">
            <span className={`pw-prefix ${feedback?.type ?? ''}`}>
              {current.blah}
            </span>
            {needsPrefixSeparator && <span className="pw-sep">-</span>}
            <span className="pw-root">{rootWord}</span>
            {suffix && (
              <>
                <span className="pw-sep">-</span>
                <span className="pw-suffix">{suffix.replace(/^-/, '')}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pw-controls">
        <button
          className="pw-arrow"
          onClick={() => cycle(-1)}
          disabled={solved}
          aria-label="Previous prefix"
        >
          ◀
        </button>
        <div className="pw-chip-display">
          <div className="pw-chip-label">PREFIX KEY</div>
          <div className="pw-chip">{current.blah}</div>
          <div className="pw-chip-index">
            {index + 1} / {prefixes.length}
          </div>
        </div>
        <button
          className="pw-arrow"
          onClick={() => cycle(1)}
          disabled={solved}
          aria-label="Next prefix"
        >
          ▶
        </button>
      </div>

      <button
        className={`pw-try ${solved ? 'solved' : ''}`}
        onClick={handleTry}
        disabled={solved}
      >
        {solved ? '✓ Unlocked' : 'Try it'}
      </button>

      {feedback && (
        <p className={`pw-feedback pw-feedback-${feedback.type}`}>
          {feedback.text}
        </p>
      )}
    </div>
  );
}

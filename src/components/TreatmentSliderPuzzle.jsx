import { useState } from 'react';
import './TreatmentSliderPuzzle.css';

export default function TreatmentSliderPuzzle({
  title,
  instructions,
  beforeLabel = 'a-sondy',
  afterLabel = 'me-sondy',
  rootLabel = 'sondy',
  successMessage,
  initiallySolved = false,
  onSolve,
}) {
  const [recovery, setRecovery] = useState(initiallySolved ? 100 : 0);
  const [solved, setSolved] = useState(initiallySolved);
  const recoveryRatio = recovery / 100;
  const ready = recovery >= 90;

  const finish = () => {
    if (!ready || solved) return;
    setRecovery(100);
    setSolved(true);
    onSolve?.();
  };

  const moveRecord = () => {
    if (solved) return;
    setRecovery(100);
  };

  return (
    <div className="treatment-slider-puzzle">
      {title && <h2 className="treatment-slider-title">{title}</h2>}
      {instructions && (
        <p className="treatment-slider-instructions">{instructions}</p>
      )}

      <div
        className="treatment-stage"
        style={{
          '--sick-opacity': 1 - recoveryRatio,
          '--well-opacity': recoveryRatio,
        }}
      >
        <div className="treatment-status treatment-status-before">
          <span>{beforeLabel}</span>
        </div>
        <div className="treatment-portrait" aria-hidden="true">
          <div className="treatment-face treatment-face-sick">
            <span className="treatment-eye left" />
            <span className="treatment-eye right" />
            <span className="treatment-mouth" />
            <span className="treatment-spot spot-one" />
            <span className="treatment-spot spot-two" />
          </div>
          <div className="treatment-face treatment-face-well">
            <span className="treatment-eye left" />
            <span className="treatment-eye right" />
            <span className="treatment-mouth" />
          </div>
        </div>
        <div className="treatment-status treatment-status-after">
          <span>{afterLabel}</span>
        </div>
      </div>

      <div className="treatment-root-strip">
        <span>{beforeLabel.split(rootLabel)[0] || 'a-'}</span>
        <strong>{rootLabel}</strong>
        <span>{afterLabel.split(rootLabel)[0] || 'me-'}</span>
      </div>

      <label className="treatment-range-label" htmlFor="treatment-range">
        Treatment record
      </label>
      <input
        id="treatment-range"
        className="treatment-range"
        type="range"
        min="0"
        max="100"
        value={recovery}
        onChange={(event) => setRecovery(Number(event.target.value))}
        disabled={solved}
      />

      <button
        className={`treatment-move ${ready ? 'is-ready' : ''}`}
        onClick={moveRecord}
        disabled={solved}
      >
        Move Record to {afterLabel}
      </button>

      <button
        className="treatment-keep"
        onClick={finish}
        disabled={!ready || solved}
      >
        Keep Clue
      </button>

      {solved && (
        <p className="treatment-feedback" aria-live="polite">
          {successMessage ??
            'sondy is the treatment. a- marks before, and me- marks after.'}
        </p>
      )}
    </div>
  );
}

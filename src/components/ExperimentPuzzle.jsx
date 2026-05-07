import { useMemo, useState } from 'react';
import './ExperimentPuzzle.css';

export default function ExperimentPuzzle({
  title,
  instructions,
  samples = [],
  correctSampleId,
  successMessage,
  onSolve,
}) {
  const [activeSampleId, setActiveSampleId] = useState(null);
  const [testedSampleIds, setTestedSampleIds] = useState(new Set());
  const [fillRun, setFillRun] = useState(0);
  const [solved, setSolved] = useState(false);

  const activeSample = useMemo(
    () => samples.find((sample) => sample.id === activeSampleId),
    [activeSampleId, samples]
  );
  const foundCorrect = testedSampleIds.has(correctSampleId);

  const testSample = (sample) => {
    if (solved) return;
    setActiveSampleId(sample.id);
    setFillRun((run) => run + 1);
    setTestedSampleIds((current) => new Set(current).add(sample.id));
  };

  const finish = () => {
    if (!foundCorrect || solved) return;
    setSolved(true);
    onSolve?.();
  };

  return (
    <div className="experiment-puzzle">
      {title && <h2 className="experiment-title">{title}</h2>}
      {instructions && <p className="experiment-instructions">{instructions}</p>}

      <div className="experiment-console">
        <div className="experiment-buttons">
          {samples.map((sample) => (
            <button
              key={sample.id}
              className={`experiment-button ${
                activeSampleId === sample.id ? 'active' : ''
              } ${testedSampleIds.has(sample.id) ? 'tested' : ''}`}
              onClick={() => testSample(sample)}
              disabled={solved}
            >
              {sample.label}
            </button>
          ))}
        </div>

        <div className="experiment-output" aria-live="polite">
          <div
            className={`experiment-cup ${
              activeSample ? 'experiment-cup-filled' : ''
            }`}
          >
            {activeSample && (
              <span
                key={`${activeSample.id}-${fillRun}`}
                className="experiment-liquid"
                style={{ background: activeSample.color }}
              />
            )}
          </div>
          <p>
            {activeSample
              ? activeSample.result
              : 'The cup is empty. Press a button to test it.'}
          </p>
        </div>
      </div>

      {foundCorrect && (
        <div className="experiment-resolution">
          <p>{successMessage ?? 'That label matches the result.'}</p>
          <button onClick={finish} disabled={solved}>
            Keep Clue
          </button>
        </div>
      )}
    </div>
  );
}

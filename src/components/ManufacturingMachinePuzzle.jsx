import { useEffect, useRef, useState } from 'react';
import './ManufacturingMachinePuzzle.css';

function normalizeOption(option) {
  if (typeof option === 'string') return { id: option, label: option };
  return option;
}

export default function ManufacturingMachinePuzzle({
  title,
  instructions,
  firstPrompt,
  secondPrompt,
  blankLabel = 'Sondy:',
  sliderLabel = 'Moll',
  options = [],
  correctOptionId,
  successMessage = 'Correct! We want to maximize the amount of Anti-Virus we send.',
  onSolve,
}) {
  const normalizedOptions = options.map(normalizeOption);
  const [stepIndex, setStepIndex] = useState(0);
  const [placedOption, setPlacedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [solved, setSolved] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const selectableOptions = normalizedOptions.filter(
    (option) => option.id !== placedOption?.id
  );

  const handleDrop = (event) => {
    event.preventDefault();
    if (stepIndex !== 0 || solved) return;

    const optionId = event.dataTransfer.getData('text/plain');
    const option = normalizedOptions.find((entry) => entry.id === optionId);
    if (!option) return;

    setPlacedOption(option);
    setFeedback(null);
  };

  const handleChooseOption = (option) => {
    if (stepIndex !== 0 || solved) return;
    setPlacedOption(option);
    setFeedback(null);
  };

  const clearPlacement = () => {
    if (stepIndex !== 0 || solved) return;
    setPlacedOption(null);
    setFeedback(null);
  };

  const submitFirstStep = () => {
    if (!placedOption || solved) return;

    if (placedOption.id !== correctOptionId) {
      setFeedback('That command will not fill the treatment line correctly.');
      return;
    }

    setFeedback('Accepted. Sondy uses puacarda.');
    timeoutRef.current = setTimeout(() => {
      setFeedback(null);
      setStepIndex(1);
    }, 700);
  };

  const handleSliderChange = (event) => {
    if (solved) return;

    const nextValue = Number(event.target.value);
    setSliderValue(nextValue);

    if (nextValue < 100 || solved) return;

    setSolved(true);
    setFeedback(successMessage);
    timeoutRef.current = setTimeout(() => onSolve?.(), 900);
  };

  return (
    <div className="manufacturing-puzzle">
      {title && <h2 className="manufacturing-title">{title}</h2>}
      {instructions && (
        <p className="manufacturing-instructions">{instructions}</p>
      )}

      {stepIndex === 0 ? (
        <>
          {firstPrompt && (
            <p className="manufacturing-prompt">{firstPrompt}</p>
          )}

          <div className="manufacturing-fill-row">
            <div className="manufacturing-fixed-label">{blankLabel}</div>
            <button
              className={`manufacturing-drop-zone ${
                placedOption ? 'filled' : ''
              }`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              onClick={clearPlacement}
              aria-label="Production blank"
            >
              {placedOption?.label ?? ''}
            </button>
          </div>

          <div className="manufacturing-options">
            {selectableOptions.map((option) => (
              <button
                key={option.id}
                className="manufacturing-option"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', option.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() => handleChooseOption(option)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            className="manufacturing-submit"
            onClick={submitFirstStep}
            disabled={!placedOption}
          >
            Check
          </button>
        </>
      ) : (
        <>
          {secondPrompt && (
            <p className="manufacturing-prompt">{secondPrompt}</p>
          )}

          <div className="manufacturing-slider-card">
            <div className="manufacturing-fixed-label">{sliderLabel}</div>
            <div className="manufacturing-slider-wrap">
              <input
                className="manufacturing-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                disabled={solved}
                aria-label="Production amount"
              />
              <div className="manufacturing-slider-scale" aria-hidden="true">
                <span className="scale-dot small" />
                <span className="scale-dot medium" />
                <span className="scale-dot large" />
              </div>
            </div>
          </div>
        </>
      )}

      {feedback && (
        <p
          className={`manufacturing-feedback ${
            solved || stepIndex === 1 ? 'success' : 'wrong'
          }`}
          aria-live="polite"
        >
          {feedback}
        </p>
      )}
    </div>
  );
}

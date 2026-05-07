import { useEffect, useRef, useState } from 'react';
import './ChoicePuzzle.css';

function normalizeOption(option) {
  if (typeof option === 'string') return { id: option, label: option };
  return option;
}

export default function ChoicePuzzle({
  title,
  instructions,
  body,
  question,
  options = [],
  correctOptionId,
  steps,
  initiallySolved = false,
  onSolve,
}) {
  const stepList =
    steps?.length > 0
      ? steps
      : [{ body, question, options, correctOptionId }];
  const initialIndex = initiallySolved ? Math.max(0, stepList.length - 1) : 0;
  const initialStep = stepList[initialIndex] ?? stepList[0];
  const [index, setIndex] = useState(initialIndex);
  const [feedback, setFeedback] = useState(() =>
    initiallySolved
      ? {
          type: 'success',
          text: initialStep?.correctMessage ?? 'That fits.',
        }
      : null
  );
  const [locked, setLocked] = useState(initiallySolved);
  const [selectedOptionId, setSelectedOptionId] = useState(
    initiallySolved ? initialStep?.correctOptionId ?? null : null
  );
  const timeoutRef = useRef(null);

  const step = stepList[index] ?? stepList[0];
  const normalizedOptions = (step.options ?? []).map(normalizeOption);
  const correctId = step.correctOptionId;
  const isLast = index >= stepList.length - 1;

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const choose = (option) => {
    if (locked) return;
    setSelectedOptionId(option.id);

    if (option.id !== correctId) {
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That does not fit the clue. Try again.',
      });
      return;
    }

    setLocked(true);
    setFeedback({
      type: 'success',
      text: step.correctMessage ?? 'That fits.',
    });

    if (isLast) {
      onSolve?.();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIndex((i) => i + 1);
      setFeedback(null);
      setSelectedOptionId(null);
      setLocked(false);
    }, 750);
  };

  return (
    <div className="choice-puzzle">
      {title && <h2 className="choice-title">{title}</h2>}
      {instructions && <p className="choice-instructions">{instructions}</p>}

      <div className="choice-panel">
        {step.body && <div className="choice-body">{step.body}</div>}
        {step.question && <p className="choice-question">{step.question}</p>}
      </div>

      <div className="choice-options">
        {normalizedOptions.map((option) => (
          <button
            key={option.id}
            className={`choice-option ${
              selectedOptionId === option.id ? feedback?.type ?? 'selected' : ''
            } ${
              locked && option.id === correctId ? 'correct-answer' : ''
            }`}
            onClick={() => choose(option)}
            disabled={locked}
          >
            {option.label}
          </button>
        ))}
      </div>

      {feedback && (
        <p
          className={`choice-feedback choice-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}

      {stepList.length > 1 && (
        <div className="choice-progress">
          {index + 1} / {stepList.length}
        </div>
      )}
    </div>
  );
}

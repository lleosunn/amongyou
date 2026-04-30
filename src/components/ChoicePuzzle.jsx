import { useEffect, useRef, useState } from 'react';
import { playTone } from '../sound';
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
  onSolve,
}) {
  const stepList =
    steps?.length > 0
      ? steps
      : [{ body, question, options, correctOptionId }];
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
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
      playTone('wrong');
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That does not fit the clue. Try again.',
      });
      return;
    }

    playTone('success');
    setLocked(true);
    setFeedback({
      type: 'success',
      text: step.correctMessage ?? 'That fits.',
    });

    timeoutRef.current = setTimeout(() => {
      if (isLast) {
        onSolve?.();
      } else {
        setIndex((i) => i + 1);
        setFeedback(null);
        setSelectedOptionId(null);
        setLocked(false);
      }
    }, isLast ? 900 : 750);
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

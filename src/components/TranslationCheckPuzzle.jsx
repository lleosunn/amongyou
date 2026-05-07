import { useState } from 'react';
import { useGameState } from '../gameContext';
import { getMorpheme } from '../languageData';
import './TranslationCheckPuzzle.css';

function normalizeAnswer(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function answerMatches(value, keywordGroups = []) {
  const normalized = normalizeAnswer(value);
  if (!normalized) return false;

  return keywordGroups.every((group) =>
    group.some((keyword) => normalized.includes(normalizeAnswer(keyword)))
  );
}

function makeCompletedAnswer(keywordGroups = []) {
  return keywordGroups
    .map((group) => group[0])
    .filter(Boolean)
    .join(' ');
}

export default function TranslationCheckPuzzle({
  title,
  instructions,
  labelLines = [],
  requiredMorphemes = [],
  prompt,
  placeholder = 'Type your translation',
  lockedMessage,
  readyMessage,
  wrongMessage = 'That does not match the word parts yet.',
  successMessage = 'That translation fits.',
  acceptedKeywordGroups = [],
  showDecode = true,
  initiallySolved = false,
  onSolve,
}) {
  const { hasLearned } = useGameState();
  const [answer, setAnswer] = useState(() =>
    initiallySolved ? makeCompletedAnswer(acceptedKeywordGroups) : ''
  );
  const [feedback, setFeedback] = useState(
    initiallySolved ? { type: 'success', text: successMessage } : null
  );
  const [solved, setSolved] = useState(initiallySolved);

  const learnedRequired = requiredMorphemes.filter((id) => hasLearned(id));
  const ready =
    initiallySolved || learnedRequired.length === requiredMorphemes.length;

  const submit = (event) => {
    event.preventDefault();
    if (!ready || solved) return;

    if (!answerMatches(answer, acceptedKeywordGroups)) {
      setFeedback({ type: 'wrong', text: wrongMessage });
      return;
    }

    setSolved(true);
    setFeedback({ type: 'success', text: successMessage });
    onSolve?.();
  };

  return (
    <div className="translation-check">
      {title && <h2 className="translation-title">{title}</h2>}
      {instructions && (
        <p className="translation-instructions">{instructions}</p>
      )}

      <div className="translation-label">
        {labelLines.map((line) => (
          <div key={line} className="translation-label-line">
            {line}
          </div>
        ))}
      </div>

      {showDecode && (
        <div className="translation-decode">
          {requiredMorphemes.map((id) => {
            const morpheme = getMorpheme(id);
            const learned = hasLearned(id);

            return (
              <div
                key={id}
                className={`translation-token ${learned ? 'known' : 'unknown'}`}
              >
                <span className="translation-token-word">
                  {morpheme?.blah ?? id}
                </span>
                <span className="translation-token-meaning">
                  {learned ? morpheme?.english : '???'}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p className="translation-status">
        {ready ? readyMessage : lockedMessage}
      </p>

      <form className="translation-form" onSubmit={submit}>
        <label className="translation-prompt" htmlFor="translation-answer">
          {prompt}
        </label>
        <input
          id="translation-answer"
          className="translation-input"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
            setFeedback(null);
          }}
          disabled={!ready || solved}
          placeholder={ready ? placeholder : 'Learn more words first'}
          autoComplete="off"
        />
        <button
          className="translation-submit"
          type="submit"
          disabled={!ready || solved || !answer.trim()}
        >
          Check
        </button>
      </form>

      {feedback && (
        <p
          className={`translation-feedback translation-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}

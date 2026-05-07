import { useEffect, useRef, useState } from 'react';
import { getPuzzleAsset } from '../puzzleAssets';
import './VisualDiscoveryPuzzle.css';

function sameSelection(selectedIds, correctIds) {
  if (selectedIds.length !== correctIds.length) return false;
  const selected = new Set(selectedIds);
  return correctIds.every((id) => selected.has(id));
}

function combineCopy(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function VisualDiscoveryPuzzle({ title, instructions, steps = [], onSolve }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedMeaningId, setSelectedMeaningId] = useState(null);
  const [meaningPlacements, setMeaningPlacements] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [advancing, setAdvancing] = useState(false);
  const [solved, setSolved] = useState(false);
  const timeoutRef = useRef(null);

  const step = steps[stepIndex] ?? steps[0];
  const correctIds = step?.correctPartIds ?? [];
  const correctCardIds = step?.correctCardIds ?? [];
  const meaningChips = step?.meaningChips ?? [];
  const isLast = stepIndex >= steps.length - 1;
  const leadCopy = combineCopy(instructions, step?.prompt);
  const isCardChoice = correctCardIds.length > 0;
  const isMeaningMatch = meaningChips.length > 0;
  const placedMeaningIds = new Set(Object.values(meaningPlacements));

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const resetStep = () => {
    setSelectedIds([]);
    setSelectedMeaningId(null);
    setMeaningPlacements({});
    setFeedback(null);
    setAdvancing(false);
  };

  const moveNext = () => {
    if (isLast) {
      setSolved(true);
      timeoutRef.current = setTimeout(() => onSolve?.(), 900);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((current) => current + 1);
      resetStep();
    }, 900);
  };

  const choosePart = (partId) => {
    if (!step || advancing || solved) return;

    const nextSelection = selectedIds.includes(partId)
      ? selectedIds.filter((id) => id !== partId)
      : [...selectedIds, partId];

    setSelectedIds(nextSelection);
    setFeedback(null);

    if (nextSelection.length < correctIds.length) return;

    if (!sameSelection(nextSelection, correctIds)) {
      setAdvancing(true);
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That pattern does not fit the pictures.',
      });
      timeoutRef.current = setTimeout(resetStep, 850);
      return;
    }

    setAdvancing(true);
    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'That pattern fits.',
    });
    moveNext();
  };

  const chooseCard = (cardId) => {
    if (!step || advancing || solved) return;

    if (!sameSelection([cardId], correctCardIds)) {
      setAdvancing(true);
      setSelectedIds([cardId]);
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That image does not match the clue.',
      });
      timeoutRef.current = setTimeout(resetStep, 850);
      return;
    }

    setAdvancing(true);
    setSelectedIds([cardId]);
    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'That picture fits.',
    });
    moveNext();
  };

  const placeMeaning = (card, meaningId) => {
    if (!step || advancing || solved || !meaningId) return;

    if (card.acceptedMeaningId !== meaningId) {
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That meaning belongs with the other image.',
      });
      setSelectedMeaningId(null);
      return;
    }

    const nextPlacements = { ...meaningPlacements, [card.id]: meaningId };
    setMeaningPlacements(nextPlacements);
    setSelectedMeaningId(null);
    setFeedback(null);

    const allSolved = (step.cards ?? []).every(
      (entry) => nextPlacements[entry.id] === entry.acceptedMeaningId
    );

    if (!allSolved) return;

    setAdvancing(true);
    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'The meanings fit the gestures.',
    });
    moveNext();
  };

  const renderLabel = (card, interactive = true) => (
    <div
      className={`visual-label ${interactive ? '' : 'visual-label-static'}`}
      aria-label={card.label}
    >
      {(card.labelParts ?? []).map((part) =>
        interactive ? (
          <button
            key={part.id}
            className={`visual-part ${
              selectedIds.includes(part.id) ? 'selected' : ''
            }`}
            onClick={() => choosePart(part.id)}
            disabled={advancing || solved}
            aria-label={`Select ${part.text} from ${card.label}`}
          >
            {part.text}
          </button>
        ) : (
          <span key={part.id} className="visual-part visual-part-static">
            {part.text}
          </span>
        )
      )}
    </div>
  );

  if (!step) return null;

  if (isMeaningMatch) {
    return (
      <div className="visual-discovery">
        {title && <h2 className="visual-title">{title}</h2>}
        {leadCopy && <p className="visual-instructions">{leadCopy}</p>}

        <div className="visual-card-grid">
          {(step.cards ?? []).map((card) => {
            const image = getPuzzleAsset(card.imageKey);
            const placedMeaning = meaningChips.find(
              (chip) => chip.id === meaningPlacements[card.id]
            );

            return (
              <article key={card.id} className="visual-card visual-meaning-card">
                <div
                  className={`visual-picture visual-picture-${card.visual} ${
                    image ? 'has-image' : ''
                  }`}
                  aria-hidden="true"
                >
                  {image ? (
                    <img className="visual-image" src={image} alt="" />
                  ) : (
                    <>
                      <span className="visual-orbit" />
                      <span className="visual-figure" />
                      <span className="visual-tool" />
                    </>
                  )}
                </div>
                <div className="visual-card-copy">
                  <h3>{card.title}</h3>
                  {card.caption && <p>{card.caption}</p>}
                </div>
                <button
                  className={`visual-meaning-target ${
                    placedMeaning ? 'filled' : ''
                  }`}
                  onClick={() => placeMeaning(card, selectedMeaningId)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    placeMeaning(card, event.dataTransfer.getData('text/plain'));
                  }}
                  disabled={advancing || solved}
                  aria-label={`Match meaning for ${card.label}`}
                >
                  {placedMeaning?.label ?? 'Drop meaning'}
                </button>
              </article>
            );
          })}
        </div>

        <div className="visual-meaning-chips">
          {meaningChips
            .filter((chip) => !placedMeaningIds.has(chip.id))
            .map((chip) => (
              <button
                key={chip.id}
                className={`visual-meaning-chip ${
                  selectedMeaningId === chip.id ? 'selected' : ''
                }`}
                draggable={!advancing && !solved}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', chip.id);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                onClick={() =>
                  setSelectedMeaningId((current) =>
                    current === chip.id ? null : chip.id
                  )
                }
                disabled={advancing || solved}
              >
                {chip.label}
              </button>
            ))}
        </div>

        {feedback && (
          <p
            className={`visual-feedback visual-feedback-${feedback.type}`}
            aria-live="polite"
          >
            {feedback.text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="visual-discovery">
      {title && <h2 className="visual-title">{title}</h2>}
      {leadCopy && <p className="visual-instructions">{leadCopy}</p>}

      <div className="visual-card-grid">
        {(step.cards ?? []).map((card) => {
          const image = getPuzzleAsset(card.imageKey);

          const CardTag = isCardChoice ? 'button' : 'article';
          const label = renderLabel(card, !isCardChoice);
          const labelOnImage = card.labelOnImage && !isCardChoice;

          return (
            <CardTag
              key={card.id}
              className={`visual-card ${
                isCardChoice ? 'visual-card-selectable' : ''
              } ${selectedIds.includes(card.id) ? 'selected' : ''}`}
              onClick={isCardChoice ? () => chooseCard(card.id) : undefined}
              disabled={isCardChoice ? advancing || solved : undefined}
              type={isCardChoice ? 'button' : undefined}
              aria-label={isCardChoice ? card.title : undefined}
            >
              <div
                className={`visual-picture visual-picture-${card.visual} ${
                  image ? 'has-image' : ''
                }`}
                aria-hidden={labelOnImage ? undefined : true}
              >
                {image ? (
                  <img className="visual-image" src={image} alt="" />
                ) : (
                  <>
                    <span className="visual-orbit" />
                    <span className="visual-figure" />
                    <span className="visual-tool" />
                  </>
                )}
                {labelOnImage && label}
              </div>
              <div className="visual-card-copy">
                <h3>{card.title}</h3>
                {card.caption && <p>{card.caption}</p>}
              </div>
              {!labelOnImage && label}
            </CardTag>
          );
        })}
      </div>

      {feedback && (
        <p
          className={`visual-feedback visual-feedback-${feedback.type}`}
          aria-live="polite"
        >
          {feedback.text}
        </p>
      )}

      {steps.length > 1 && (
        <div className="visual-progress">
          {stepIndex + 1} / {steps.length}
        </div>
      )}
    </div>
  );
}

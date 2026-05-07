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

function getPartText(step, partId) {
  return (step?.cards ?? [])
    .flatMap((card) => card.labelParts ?? [])
    .find((part) => part.id === partId)?.text;
}

function makeSolvedSelectedIds(step) {
  if ((step?.correctPartIds ?? []).length > 0) {
    return [...step.correctPartIds];
  }

  if ((step?.correctCardIds ?? []).length > 0) {
    return [...step.correctCardIds];
  }

  return [];
}

function makeSolvedMeaningPlacements(step) {
  return Object.fromEntries(
    (step?.cards ?? [])
      .filter((card) => card.acceptedMeaningId)
      .map((card) => [card.id, card.acceptedMeaningId])
  );
}

export default function VisualDiscoveryPuzzle({
  title,
  instructions,
  steps = [],
  initiallySolved = false,
  onSolve,
}) {
  const initialStepIndex = initiallySolved ? Math.max(0, steps.length - 1) : 0;
  const initialStep = steps[initialStepIndex] ?? steps[0];
  const [stepIndex, setStepIndex] = useState(initialStepIndex);
  const [selectedIds, setSelectedIds] = useState(() =>
    initiallySolved ? makeSolvedSelectedIds(initialStep) : []
  );
  const [selectedMeaningId, setSelectedMeaningId] = useState(null);
  const [meaningPlacements, setMeaningPlacements] = useState(() =>
    initiallySolved ? makeSolvedMeaningPlacements(initialStep) : {}
  );
  const [feedback, setFeedback] = useState(() =>
    initiallySolved
      ? {
          type: 'success',
          text: initialStep?.successMessage ?? 'That pattern fits.',
        }
      : null
  );
  const [advancing, setAdvancing] = useState(false);
  const [solved, setSolved] = useState(initiallySolved);
  const timeoutRef = useRef(null);

  const step = steps[stepIndex] ?? steps[0];
  const correctIds = step?.correctPartIds ?? [];
  const anyCorrectIds = step?.anyCorrectPartIds ?? [];
  const correctCardIds = step?.correctCardIds ?? [];
  const meaningChips = step?.meaningChips ?? [];
  const meaningOptions = step?.meaningOptions ?? [];
  const isLast = stepIndex >= steps.length - 1;
  const leadCopy = combineCopy(instructions, step?.prompt);
  const isCardChoice = correctCardIds.length > 0;
  const isMeaningMatch = meaningChips.length > 0;
  const isMeaningChoice = meaningOptions.length > 0;
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
      onSolve?.();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStepIndex((current) => current + 1);
      resetStep();
    }, 900);
  };

  const choosePart = (partId) => {
    if (!step || advancing || solved) return;

    if (anyCorrectIds.length) {
      setSelectedIds([partId]);
      setFeedback(null);

      if (!anyCorrectIds.includes(partId)) {
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
      return;
    }

    const isDeselecting = selectedIds.includes(partId);
    const nextSelection = selectedIds.includes(partId)
      ? selectedIds.filter((id) => id !== partId)
      : [...selectedIds, partId];

    setSelectedIds(nextSelection);
    setFeedback(null);

    if (isDeselecting) {
      setFeedback({
        type: 'hint',
        text:
          nextSelection.length > 0
            ? 'Selection updated.'
            : 'Selection cleared.',
      });
      return;
    }

    if (
      !isDeselecting &&
      correctIds.length > 0 &&
      !correctIds.includes(partId)
    ) {
      setAdvancing(true);
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That pattern does not fit the pictures.',
      });
      timeoutRef.current = setTimeout(resetStep, 850);
      return;
    }

    if (nextSelection.length < correctIds.length) {
      setFeedback({
        type: 'hint',
        text:
          step.partialMessage ??
          `${getPartText(step, partId) ?? 'That part'} is selected. Find the matching part on the other poster.`,
      });
      return;
    }

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

  const chooseMeaningOption = (optionId) => {
    if (!step || advancing || solved) return;

    setSelectedMeaningId(optionId);

    if (optionId !== step.correctMeaningId) {
      setAdvancing(true);
      setFeedback({
        type: 'wrong',
        text: step.wrongMessage ?? 'That meaning does not fit the clues.',
      });
      timeoutRef.current = setTimeout(resetStep, 850);
      return;
    }

    setAdvancing(true);
    setFeedback({
      type: 'success',
      text: step.successMessage ?? 'That meaning fits.',
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

  if (isMeaningChoice) {
    return (
      <div className="visual-discovery">
        {title && <h2 className="visual-title">{title}</h2>}
        {leadCopy && <p className="visual-instructions">{leadCopy}</p>}

        <div
          className={`visual-card-grid ${
            (step.cards ?? []).length === 1 ? 'visual-card-grid-single' : ''
          }`}
        >
          {(step.cards ?? []).map((card) => {
            const image = getPuzzleAsset(card.imageKey);

            return (
              <article key={card.id} className="visual-card">
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
                {renderLabel(card, false)}
              </article>
            );
          })}
        </div>

        <div className="visual-meaning-chips">
          {meaningOptions.map((option) => (
            <button
              key={option.id}
              className={`visual-meaning-chip ${
                selectedMeaningId === option.id ? 'selected' : ''
              }`}
              onClick={() => chooseMeaningOption(option.id)}
              disabled={advancing || solved}
            >
              {option.label}
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

        {steps.length > 1 && (
          <div className="visual-progress">
            {stepIndex + 1} / {steps.length}
          </div>
        )}
      </div>
    );
  }

  if (isMeaningMatch) {
    return (
      <div className="visual-discovery">
        {title && <h2 className="visual-title">{title}</h2>}
        {leadCopy && <p className="visual-instructions">{leadCopy}</p>}

        <div
          className={`visual-card-grid ${
            (step.cards ?? []).length === 1 ? 'visual-card-grid-single' : ''
          }`}
        >
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
                  {(card.labelParts ?? []).length > 0 && renderLabel(card, false)}
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
                  {placedMeaning?.label ?? step.meaningTargetLabel ?? 'Drop meaning'}
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

      <div
        className={`visual-card-grid ${
          (step.cards ?? []).length === 1 ? 'visual-card-grid-single' : ''
        }`}
      >
        {(step.cards ?? []).map((card) => {
          const image = getPuzzleAsset(card.imageKey);

          const CardTag = isCardChoice ? 'button' : 'article';
          const label = renderLabel(card, !isCardChoice);
          const labelOnImage = card.labelOnImage && !isCardChoice;
          const labelAsTitle = card.labelAsTitle && !isCardChoice;

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
                {labelAsTitle ? (
                  label
                ) : (
                  card.title && <h3>{card.title}</h3>
                )}
                {card.caption && <p>{card.caption}</p>}
              </div>
              {!labelOnImage && !labelAsTitle && label}
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

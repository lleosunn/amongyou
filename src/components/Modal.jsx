import { useEffect, useState } from 'react';
import MatchingPuzzle from './MatchingPuzzle';
import PrefixWheelPuzzle from './PrefixWheelPuzzle';
import SequencePuzzle from './SequencePuzzle';
import ChoicePuzzle from './ChoicePuzzle';
import BuilderPuzzle from './BuilderPuzzle';
import ConversationPuzzle from './ConversationPuzzle';
import ExperimentPuzzle from './ExperimentPuzzle';
import VocabularyReview from './VocabularyReview';
import TranslationCheckPuzzle from './TranslationCheckPuzzle';
import VisualDiscoveryPuzzle from './VisualDiscoveryPuzzle';
import './Modal.css';

function ClueContent({ title, body, note }) {
  return (
    <>
      {title && <h2>{title}</h2>}
      <div className="clue-text">{body}</div>
      {note && <p className="clue-note">{note}</p>}
    </>
  );
}

function NarrationContent({ title, lines = [], onAdvance }) {
  const [index, setIndex] = useState(0);
  const isLast = index >= lines.length - 1;

  const advance = () => {
    if (isLast) {
      onAdvance?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="narration-content">
      {title && <h2>{title}</h2>}
      <p className="narration-line">{lines[index]}</p>
      <button className="narration-next" onClick={advance}>
        {isLast ? 'Close' : 'Next'}
      </button>
      {lines.length > 1 && (
        <div className="narration-dots">
          {lines.map((_, i) => (
            <span
              key={i}
              className={`nd-dot ${i === index ? 'active' : ''} ${
                i < index ? 'past' : ''
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Modal({ children, onClose }) {
  const content = children;
  const isInteractive =
    content?.type === 'matching' ||
    content?.type === 'choice' ||
    content?.type === 'builder' ||
    content?.type === 'conversation' ||
    content?.type === 'experiment' ||
    content?.type === 'prefix-wheel' ||
    content?.type === 'sequence' ||
    content?.type === 'translation-check' ||
    content?.type === 'visual-discovery';
  const isReview = content?.type === 'vocabulary-review';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderContent = () => {
    if (!content || typeof content !== 'object') return content;

    switch (content.type) {
      case 'clue':
        return (
          <ClueContent
            title={content.title}
            body={content.body}
            note={content.note}
          />
        );
      case 'narration':
        return (
          <NarrationContent
            title={content.title}
            lines={content.lines}
            onAdvance={() => {
              content.onComplete?.();
              onClose?.();
            }}
          />
        );
      case 'matching':
        return (
          <MatchingPuzzle
            title={content.title}
            instructions={content.instructions}
            image={content.image}
            targets={content.targets}
            chips={content.chips}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'choice':
        return (
          <ChoicePuzzle
            title={content.title}
            instructions={content.instructions}
            body={content.body}
            question={content.question}
            options={content.options}
            correctOptionId={content.correctOptionId}
            steps={content.steps}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'builder':
        return (
          <BuilderPuzzle
            title={content.title}
            instructions={content.instructions}
            prompt={content.prompt}
            availableTiles={content.availableTiles}
            correctSequence={content.correctSequence}
            slotCount={content.slotCount}
            steps={content.steps}
            wrongMessage={content.wrongMessage}
            successMessage={content.successMessage}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'experiment':
        return (
          <ExperimentPuzzle
            title={content.title}
            instructions={content.instructions}
            samples={content.samples}
            correctSampleId={content.correctSampleId}
            successMessage={content.successMessage}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'conversation':
        return (
          <ConversationPuzzle
            title={content.title}
            instructions={content.instructions}
            steps={content.steps}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'vocabulary-review':
        return (
          <VocabularyReview
            title={content.title}
            message={content.message}
            onComplete={() => {
              content.onComplete?.();
            }}
          />
        );
      case 'translation-check':
        return (
          <TranslationCheckPuzzle
            title={content.title}
            instructions={content.instructions}
            labelLines={content.labelLines}
            requiredMorphemes={content.requiredMorphemes}
            prompt={content.prompt}
            placeholder={content.placeholder}
            lockedMessage={content.lockedMessage}
            readyMessage={content.readyMessage}
            wrongMessage={content.wrongMessage}
            successMessage={content.successMessage}
            acceptedKeywordGroups={content.acceptedKeywordGroups}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'visual-discovery':
        return (
          <VisualDiscoveryPuzzle
            title={content.title}
            instructions={content.instructions}
            steps={content.steps}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'prefix-wheel':
        return (
          <PrefixWheelPuzzle
            title={content.title}
            instructions={content.instructions}
            rootWord={content.rootWord}
            suffix={content.suffix}
            prefixes={content.prefixes}
            correctPrefixId={content.correctPrefixId}
            wrongMessage={content.wrongMessage}
            successMessage={content.successMessage}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      case 'sequence':
        return (
          <SequencePuzzle
            title={content.title}
            instructions={content.instructions}
            entries={content.entries}
            correctOrder={content.correctOrder}
            replaySteps={content.replaySteps}
            onSolve={() => {
              content.onSolve?.();
            }}
          />
        );
      default:
        return content;
    }
  };

  const isWide = isInteractive || isReview;
  const closeLabel = isReview
    ? 'Close vocabulary review'
    : isInteractive
      ? 'Close and reset puzzle'
      : 'Close modal';

  return (
    <div
      className={`modal-overlay ${isInteractive ? 'modal-locked' : ''}`}
      onClick={() => {
        if (!isInteractive) onClose?.();
      }}
      role="presentation"
    >
      <div
        className={`modal-content ${isWide ? 'modal-wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={content?.title ?? 'Game modal'}
      >
        <button className="modal-close" onClick={onClose} aria-label={closeLabel}>
          x
        </button>
        {content?.stationLabel && (
          <div className="modal-station-label">
            Inspecting: {content.stationLabel}
          </div>
        )}
        <div className="modal-body">{renderContent()}</div>
        {isInteractive && (
          <p className="modal-close-note">Closing resets this interaction.</p>
        )}
      </div>
    </div>
  );
}

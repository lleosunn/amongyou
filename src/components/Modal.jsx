import { useState } from 'react';
import MatchingPuzzle from './MatchingPuzzle';
import PrefixWheelPuzzle from './PrefixWheelPuzzle';
import SequencePuzzle from './SequencePuzzle';
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

  const isWide =
    content?.type === 'matching' ||
    content?.type === 'prefix-wheel' ||
    content?.type === 'sequence';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isWide ? 'modal-wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
}

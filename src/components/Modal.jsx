import { useState } from 'react';
import MatchingPuzzle from './MatchingPuzzle';
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
      default:
        return content;
    }
  };

  const isMatching = content?.type === 'matching';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isMatching ? 'modal-wide' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
}

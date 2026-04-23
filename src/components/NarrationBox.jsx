import { useEffect, useState } from 'react';
import './NarrationBox.css';

export default function NarrationBox({ lines, onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setIndex(0), 0);

    return () => clearTimeout(timeout);
  }, [lines]);

  if (!lines || lines.length === 0) return null;

  const line = lines[index];
  const isLast = index === lines.length - 1;

  const advance = () => {
    if (isLast) {
      onComplete?.();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="narration-overlay" onClick={advance}>
      <div className="narration-box" onClick={(e) => e.stopPropagation()}>
        <p className="narration-text">{line}</p>
        <button className="narration-advance" onClick={advance}>
          {isLast ? 'Continue' : 'Next'}
        </button>
        <div className="narration-progress">
          {lines.map((_, i) => (
            <span
              key={i}
              className={`narration-dot ${i === index ? 'active' : ''} ${
                i < index ? 'past' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

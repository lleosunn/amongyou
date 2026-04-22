import { useMemo, useState } from 'react';
import './MatchingPuzzle.css';

export default function MatchingPuzzle({
  title,
  instructions,
  image,
  targets = [],
  chips = [],
  onSolve,
}) {
  const [placements, setPlacements] = useState({});
  const [selectedChip, setSelectedChip] = useState(null);
  const [wrongPulse, setWrongPulse] = useState(null);
  const [solved, setSolved] = useState(false);

  const placedChipIds = useMemo(
    () => new Set(Object.values(placements).flat()),
    [placements]
  );

  const availableChips = chips.filter((c) => !placedChipIds.has(c.id));

  const handleTargetClick = (target) => {
    if (solved) return;
    if (!selectedChip) return;

    const isCorrect = target.acceptedChips.includes(selectedChip.id);

    if (isCorrect) {
      setPlacements((prev) => {
        const next = {
          ...prev,
          [target.id]: [...(prev[target.id] ?? []), selectedChip.id],
        };

        const allSolved = targets.every((t) => {
          const placed = next[t.id] ?? [];
          return t.acceptedChips.every((c) => placed.includes(c));
        });

        if (allSolved) {
          setSolved(true);
          setTimeout(() => onSolve?.(), 600);
        }

        return next;
      });
      setSelectedChip(null);
    } else {
      setWrongPulse(target.id);
      setTimeout(() => setWrongPulse(null), 400);
    }
  };

  const handleChipClick = (chip) => {
    if (solved) return;
    setSelectedChip((prev) => (prev?.id === chip.id ? null : chip));
  };

  const handleRemoveChip = (targetId, chipId, e) => {
    e.stopPropagation();
    if (solved) return;
    setPlacements((prev) => ({
      ...prev,
      [targetId]: (prev[targetId] ?? []).filter((id) => id !== chipId),
    }));
  };

  return (
    <div className="matching-puzzle">
      {title && <h2 className="matching-title">{title}</h2>}
      {instructions && (
        <p className="matching-instructions">{instructions}</p>
      )}

      <div className="matching-stage">
        {image && (
          <img className="matching-image" src={image} alt={title || ''} />
        )}
        {targets.map((target) => {
          const placed = placements[target.id] ?? [];
          return (
            <button
              key={target.id}
              className={`matching-target ${
                selectedChip ? 'targetable' : ''
              } ${wrongPulse === target.id ? 'wrong' : ''} ${
                placed.length === target.acceptedChips.length ? 'done' : ''
              }`}
              style={{
                left: target.x,
                top: target.y,
                width: target.w,
                height: target.h,
              }}
              onClick={() => handleTargetClick(target)}
              aria-label={target.label}
            >
              <span className="target-label">{target.label}</span>
              {placed.length > 0 && (
                <div className="target-placed">
                  {placed.map((chipId) => {
                    const chip = chips.find((c) => c.id === chipId);
                    return (
                      <span
                        key={chipId}
                        className="placed-chip"
                        onClick={(e) =>
                          handleRemoveChip(target.id, chipId, e)
                        }
                      >
                        {chip?.label ?? chipId}
                      </span>
                    );
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="matching-chips">
        {availableChips.length === 0 && !solved && (
          <p className="matching-chips-empty">All labels placed.</p>
        )}
        {availableChips.map((chip) => (
          <button
            key={chip.id}
            className={`matching-chip ${
              selectedChip?.id === chip.id ? 'selected' : ''
            }`}
            onClick={() => handleChipClick(chip)}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {solved && (
        <div className="matching-solved">
          <p>All correct! You've learned these words.</p>
        </div>
      )}
    </div>
  );
}

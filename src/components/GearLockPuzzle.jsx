import { useEffect, useRef, useState } from 'react';
import './GearLockPuzzle.css';

function normalizeAngle(angle) {
  let next = angle % 360;
  if (next < 0) next += 360;
  return next;
}

function angleFromPoint(clientX, clientY, rect) {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI;
}

function angleDelta(fromAngle, toAngle) {
  return ((toAngle - fromAngle + 540) % 360) - 180;
}

export default function GearLockPuzzle({
  title,
  instructions,
  rootWord = 'gane',
  rootMeaning,
  prefixLabel = 'op',
  solvedWord = 'opgane',
  solvedMeaning,
  successMessage = 'op- means un-',
  onSolve,
}) {
  const gearRef = useRef(null);
  const dragStateRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [solved, setSolved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (!solved) return undefined;

    const timeout = setTimeout(() => {
      setShowContinue(true);
    }, 250);

    return () => clearTimeout(timeout);
  }, [solved]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const drag = dragStateRef.current;
      const gear = gearRef.current;
      if (!drag || !gear || solved) return;

      const rect = gear.getBoundingClientRect();
      const currentAngle = angleFromPoint(event.clientX, event.clientY, rect);
      const nextRotation = normalizeAngle(
        drag.rotation + angleDelta(drag.lastAngle, currentAngle)
      );

      drag.lastAngle = currentAngle;
      drag.rotation = nextRotation;

      if (Math.abs(nextRotation - 180) <= 16) {
        setRotation(180);
        setSolved(true);
        setDragging(false);
        dragStateRef.current = null;
        return;
      }

      setRotation(nextRotation);
    };

    const handlePointerUp = () => {
      dragStateRef.current = null;
      setDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [solved]);

  const handlePointerDown = (event) => {
    if (solved || !gearRef.current) return;

    const rect = gearRef.current.getBoundingClientRect();
    const startAngle = angleFromPoint(event.clientX, event.clientY, rect);
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragStateRef.current = {
      lastAngle: startAngle,
      rotation,
    };
    setDragging(true);
  };

  const displayWord = solved ? solvedWord : rootWord;
  const displayMeaning = solved ? solvedMeaning : rootMeaning;

  return (
    <div className="gear-lock">
      {title && <h2 className="gear-lock-title">{title}</h2>}
      {instructions && (
        <p className="gear-lock-instructions">{instructions}</p>
      )}

      <div className={`gear-lock-stage ${solved ? 'solved' : ''}`}>
        <div
          ref={gearRef}
          className={`gear-lock-wheel ${solved ? 'solved' : ''} ${
            dragging ? 'dragging' : ''
          }`}
          onPointerDown={handlePointerDown}
          role="presentation"
        >
          <div
            className="gear-lock-rotor"
            style={{ '--gear-rotation': `${rotation}deg` }}
          >
            <div className="gear-lock-teeth" />
            <div className="gear-lock-prefix-track" aria-hidden="true">
              <span className="gear-lock-prefix">{prefixLabel}</span>
            </div>
          </div>
          <div className="gear-lock-center">
            <div className="gear-lock-word">{displayWord}</div>
            {displayMeaning && (
              <div className="gear-lock-meaning">{displayMeaning}</div>
            )}
          </div>
        </div>
      </div>

      <p className={`gear-lock-feedback ${solved ? 'success' : ''}`}>
        {solved
          ? successMessage
          : 'Rotate the gear until the prefix flips into place.'}
      </p>

      {showContinue && (
        <button className="gear-lock-continue" onClick={() => onSolve?.()}>
          Continue
        </button>
      )}
    </div>
  );
}

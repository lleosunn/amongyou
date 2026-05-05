import { useEffect, useRef, useState } from 'react';
import { useGameState } from '../gameContext';
import './HealthBar.css';

export default function HealthBar() {
  const { health } = useGameState();
  const [healing, setHealing] = useState(false);
  const [dropping, setDropping] = useState(false);
  const previousHealthRef = useRef(health);
  const healingStartTimeoutRef = useRef(null);
  const healingTimeoutRef = useRef(null);
  const droppingResetTimeoutRef = useRef(null);
  const droppingStartTimeoutRef = useRef(null);
  const droppingEndTimeoutRef = useRef(null);
  const percent = health * 100;
  const displayPercent = percent.toFixed(1);
  const isLow = health <= 0.35;
  const isCritical = health <= 0.21;

  useEffect(
    () => () => {
      if (healingStartTimeoutRef.current) {
        clearTimeout(healingStartTimeoutRef.current);
      }
      if (healingTimeoutRef.current) clearTimeout(healingTimeoutRef.current);
      if (droppingResetTimeoutRef.current) {
        clearTimeout(droppingResetTimeoutRef.current);
      }
      if (droppingStartTimeoutRef.current) {
        clearTimeout(droppingStartTimeoutRef.current);
      }
      if (droppingEndTimeoutRef.current) {
        clearTimeout(droppingEndTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    const previousHealth = previousHealthRef.current;

    if (health > previousHealth + 0.01) {
      previousHealthRef.current = health;

      if (healingStartTimeoutRef.current) {
        clearTimeout(healingStartTimeoutRef.current);
      }
      if (healingTimeoutRef.current) clearTimeout(healingTimeoutRef.current);
      if (droppingResetTimeoutRef.current) {
        clearTimeout(droppingResetTimeoutRef.current);
      }
      if (droppingStartTimeoutRef.current) {
        clearTimeout(droppingStartTimeoutRef.current);
      }
      if (droppingEndTimeoutRef.current) {
        clearTimeout(droppingEndTimeoutRef.current);
      }

      healingStartTimeoutRef.current = setTimeout(() => {
        setDropping(false);
        setHealing(true);
      }, 0);
      healingTimeoutRef.current = setTimeout(() => setHealing(false), 4200);
      return undefined;
    }

    if (health < previousHealth - 0.0001 && !healing) {
      previousHealthRef.current = health;

      if (droppingResetTimeoutRef.current) {
        clearTimeout(droppingResetTimeoutRef.current);
      }
      if (droppingStartTimeoutRef.current) {
        clearTimeout(droppingStartTimeoutRef.current);
      }
      if (droppingEndTimeoutRef.current) {
        clearTimeout(droppingEndTimeoutRef.current);
      }

      droppingResetTimeoutRef.current = setTimeout(() => setDropping(false), 0);
      droppingStartTimeoutRef.current = setTimeout(() => setDropping(true), 20);
      droppingEndTimeoutRef.current = setTimeout(() => setDropping(false), 520);
      return undefined;
    }

    previousHealthRef.current = health;
    return undefined;
  }, [health, healing]);

  return (
    <div
      className={`health-bar ${healing ? 'health-healing' : ''} ${
        dropping ? 'health-dropping' : ''
      } ${isLow ? 'health-low' : ''} ${
        isCritical ? 'health-critical' : ''
      }`}
      aria-label={`Health ${displayPercent}%`}
      title={`Health ${displayPercent}%`}
    >
      <div className="health-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          role="img"
          focusable="false"
          width="20"
          height="20"
          fill="#ff6b6b"
        >
          <path d="M12 21.5c-.3 0-.6-.1-.8-.3-2.7-2.4-7.2-6.7-8.8-9.1-1.7-2.5-1.3-6 .9-8 2.2-2 5.6-1.6 7.4.9.4.5.7 1 .9 1.5.2-.5.5-1 .9-1.5 1.8-2.5 5.2-2.9 7.4-.9 2.2 2 2.6 5.5.9 8-1.6 2.4-6.1 6.7-8.8 9.1-.2.2-.5.3-.8.3z" />
        </svg>
      </div>
      <div className="health-track">
        <div
          className="health-fill"
          style={{ width: `${Math.max(8, percent)}%` }}
        />
      </div>
      <span className="health-percent">{displayPercent}%</span>
    </div>
  );
}

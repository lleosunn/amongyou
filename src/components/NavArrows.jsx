import { rooms } from '../gameData';
import { useGameState } from '../gameState';
import './NavArrows.css';

const arrows = [
  { dir: 'up', label: '▲' },
  { dir: 'left', label: '◀' },
  { dir: 'right', label: '▶' },
  { dir: 'down', label: '▼' },
];

export default function NavArrows({ room, onMove }) {
  const { isUnlocked } = useGameState();

  return (
    <div className="nav-arrows">
      {arrows.map(({ dir, label }) => {
        const targetId = room[dir];
        const hasTarget = targetId !== null && targetId !== undefined;
        const targetRoom = hasTarget ? rooms[targetId] : null;
        const unlocked = targetRoom ? isUnlocked(targetRoom) : false;
        const canMove = hasTarget && unlocked;
        const locked = hasTarget && !unlocked;

        return (
          <button
            key={dir}
            className={`nav-btn nav-${dir} ${locked ? 'nav-locked' : ''}`}
            disabled={!canMove}
            onClick={() => canMove && onMove(targetId)}
            aria-label={`Move ${dir}${locked ? ' (locked)' : ''}`}
            title={locked ? 'Locked' : undefined}
          >
            {locked ? '🔒' : label}
          </button>
        );
      })}
    </div>
  );
}

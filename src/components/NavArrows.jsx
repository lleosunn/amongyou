import { rooms } from '../gameData';
import { useGameState } from '../gameContext';
import './NavArrows.css';

const arrows = [
  { dir: 'left', label: '◀' },
  { dir: 'right', label: '▶' },
];

export default function NavArrows({
  room,
  onMove,
  unlockedPulseRoomId,
  roomLocksBypassed = false,
}) {
  const { isUnlocked } = useGameState();

  return (
    <div className="nav-arrows">
      {arrows.map(({ dir, label }) => {
        const targetId = room[dir];
        const hasTarget = targetId !== null && targetId !== undefined;
        const targetRoom = hasTarget ? rooms[targetId] : null;
        const unlocked = targetRoom
          ? roomLocksBypassed || isUnlocked(targetRoom)
          : false;
        const canMove = hasTarget && unlocked;
        const locked = hasTarget && !unlocked && !roomLocksBypassed;
        const justUnlocked = canMove && targetId === unlockedPulseRoomId;

        return (
          <button
            key={dir}
            className={`nav-btn nav-${dir} ${locked ? 'nav-locked' : ''} ${
              justUnlocked ? 'nav-just-unlocked' : ''
            }`}
            disabled={!canMove}
            onClick={() => canMove && onMove(targetId)}
            aria-label={`Move ${dir}${locked ? ' (locked)' : ''}`}
            title={
              roomLocksBypassed && hasTarget
                ? 'Dev lock bypass active'
                : locked
                  ? 'Locked'
                  : undefined
            }
          >
            {locked ? '🔒' : label}
          </button>
        );
      })}
    </div>
  );
}

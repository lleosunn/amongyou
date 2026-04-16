import './NavArrows.css';

const arrows = [
  { dir: 'up', label: '▲' },
  { dir: 'left', label: '◀' },
  { dir: 'right', label: '▶' },
  { dir: 'down', label: '▼' },
];

export default function NavArrows({ room, onMove }) {
  return (
    <div className="nav-arrows">
      {arrows.map(({ dir, label }) => {
        const canMove = room[dir] !== null;
        return (
          <button
            key={dir}
            className={`nav-btn nav-${dir}`}
            disabled={!canMove}
            onClick={() => canMove && onMove(room[dir])}
            aria-label={`Move ${dir}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

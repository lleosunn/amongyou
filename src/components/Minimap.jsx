import { rooms } from '../gameData';
import { useGameState } from '../gameState';
import './Minimap.css';

const allRooms = Object.values(rooms);

const minCol = Math.min(...allRooms.map((r) => r.gridPos.col));
const maxCol = Math.max(...allRooms.map((r) => r.gridPos.col));
const minRow = Math.min(...allRooms.map((r) => r.gridPos.row));
const maxRow = Math.max(...allRooms.map((r) => r.gridPos.row));

const cols = maxCol - minCol + 1;
const rows = maxRow - minRow + 1;

function getConnections() {
  const conns = [];
  const seen = new Set();
  for (const room of allRooms) {
    for (const dir of ['right', 'down']) {
      const neighborId = room[dir];
      if (!neighborId) continue;
      const key = [room.id, neighborId].sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);
      const neighbor = rooms[neighborId];
      conns.push({
        from: room.gridPos,
        to: neighbor.gridPos,
        fromId: room.id,
        toId: neighborId,
      });
    }
  }
  return conns;
}

const connections = getConnections();

const CELL = 40;
const GAP = 8;

function posToPixel(col, row) {
  return {
    x: (col - minCol) * (CELL + GAP) + CELL / 2,
    y: (row - minRow) * (CELL + GAP) + CELL / 2,
  };
}

const svgW = cols * CELL + (cols - 1) * GAP;
const svgH = rows * CELL + (rows - 1) * GAP;

export default function Minimap({ currentRoomId }) {
  const { isUnlocked } = useGameState();

  return (
    <div className="minimap">
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
        {connections.map(({ from, to, fromId, toId }, i) => {
          const a = posToPixel(from.col, from.row);
          const b = posToPixel(to.col, to.row);
          const bothUnlocked = isUnlocked(rooms[fromId]) && isUnlocked(rooms[toId]);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={bothUnlocked ? '#888' : '#333'}
              strokeWidth={3}
              strokeDasharray={bothUnlocked ? 'none' : '4 4'}
            />
          );
        })}

        {allRooms.map((room) => {
          const { col, row } = room.gridPos;
          const x = (col - minCol) * (CELL + GAP);
          const y = (row - minRow) * (CELL + GAP);
          const isCurrent = room.id === currentRoomId;
          const unlocked = isUnlocked(room);
          return (
            <g key={room.id}>
              <rect
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={6}
                fill={isCurrent ? room.color : unlocked ? '#2a2a3e' : '#15151e'}
                stroke={unlocked ? room.color : '#444'}
                strokeWidth={isCurrent ? 3 : 1.5}
                opacity={isCurrent ? 1 : unlocked ? 0.6 : 0.4}
              />
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isCurrent ? '#1a1a2e' : unlocked ? '#aaa' : '#555'}
                fontSize={9}
                fontWeight={isCurrent ? 700 : 400}
              >
                {unlocked ? room.name.slice(0, 3).toUpperCase() : '🔒'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

import { useGameState } from '../gameContext';
import './Room.css';

export default function Room({
  room,
  onInteract,
  activeHotspotId,
  completedPulseObjective,
  children,
}) {
  const { isComplete } = useGameState();

  const visibleHotspots = (room.hotspots ?? []).filter((h) => {
    if (!h.requiresObjectives) return true;
    return h.requiresObjectives.every((o) => isComplete(o));
  });

  return (
    <div className="room-wrapper">
      <div
        className="room"
        style={{ '--room-accent': room.color, '--hud-clear': '64px' }}
      >
        <img className="room-bg" src={room.image} alt={room.name} />
        <div className="room-label">
          <h1 className="room-name">{room.name}</h1>
        </div>
        {visibleHotspots.map((hotspot) => {
          const completed =
            hotspot.objective && isComplete(hotspot.objective);
          const locked =
            hotspot.requiresObjectives &&
            !hotspot.requiresObjectives.every((objective) =>
              isComplete(objective)
            );
          const suggested = activeHotspotId === hotspot.id && !completed;
          const justCompleted =
            completedPulseObjective &&
            hotspot.objective === completedPulseObjective;

          return (
            <button
              key={hotspot.id}
              className={`station-marker ${
                completed
                  ? 'station-marker-done'
                  : locked
                    ? 'station-marker-locked'
                    : 'station-marker-available'
              } ${suggested ? 'hotspot-suggested' : ''} ${
                justCompleted ? 'hotspot-just-completed' : ''
              }`}
              style={{
                left: hotspot.x,
                top: hotspot.y,
              }}
              onClick={() => {
                if (!locked) onInteract(hotspot);
              }}
              disabled={locked}
              aria-label={hotspot.label}
            >
              <span className="station-marker-dot" aria-hidden="true">
                {completed ? '✓' : locked ? '•' : '!'}
              </span>
              <span className="station-marker-label">{hotspot.label}</span>
              <span className="station-marker-status" aria-hidden="true">
                {completed ? 'done' : locked ? 'locked' : 'inspect'}
              </span>
            </button>
          );
        })}
        {children}
      </div>
    </div>
  );
}

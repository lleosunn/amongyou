import { useGameState } from '../gameContext';
import './Room.css';

export default function Room({ room, onInteract, children }) {
  const { isComplete } = useGameState();

  const visibleHotspots = (room.hotspots ?? []).filter((h) => {
    if (!h.requiresObjectives) return true;
    return h.requiresObjectives.every((o) => isComplete(o));
  });

  return (
    <div className="room-wrapper">
      <div className="room" style={{ '--room-accent': room.color }}>
        <img className="room-bg" src={room.image} alt={room.name} />
        <div className="room-label">
          <h1 className="room-name">{room.name}</h1>
        </div>
        {visibleHotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            className={`hotspot ${
              hotspot.objective && isComplete(hotspot.objective)
                ? 'hotspot-done'
                : ''
            } ${hotspot.highlight ? 'hotspot-highlight' : ''}`}
            style={{
              left: hotspot.x,
              top: hotspot.y,
              width: hotspot.w,
              height: hotspot.h,
            }}
            onClick={() => onInteract(hotspot)}
            aria-label={hotspot.label}
          />
        ))}
        {children}
      </div>
    </div>
  );
}

import './Room.css';

export default function Room({ room, onInteract, children }) {
  return (
    <div className="room-wrapper">
      <div className="room" style={{ '--room-accent': room.color }}>
        <img className="room-bg" src={room.image} alt={room.name} />
        <div className="room-label">
          <h1 className="room-name">{room.name}</h1>
        </div>
        {room.hotspots?.map((hotspot) => (
          <button
            key={hotspot.id}
            className="hotspot"
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

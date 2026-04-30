import { useGameState } from '../gameContext';
import './RoomStationPanel.css';

function stationStatus(station, isComplete) {
  if (station.objective && isComplete(station.objective)) return 'done';
  if (
    station.requiresObjectives &&
    !station.requiresObjectives.every((objective) => isComplete(objective))
  ) {
    return 'locked';
  }
  return 'new';
}

export default function RoomStationPanel({
  room,
  activeHotspotId,
  completedPulseObjective,
  onInteract,
}) {
  const { isComplete } = useGameState();
  const stations = room.hotspots ?? [];
  const openCount = stations.filter(
    (station) => stationStatus(station, isComplete) !== 'locked'
  ).length;
  const doneCount = stations.filter(
    (station) => stationStatus(station, isComplete) === 'done'
  ).length;

  return (
    <aside className="station-panel" aria-label={`${room.name} stations`}>
      <div className="station-panel-header">
        <span className="station-panel-kicker">Stations</span>
        <h2>{room.name}</h2>
        <span className="station-panel-progress">
          {doneCount}/{stations.length} complete
        </span>
      </div>

      <div className="station-list">
        {stations.map((station, index) => {
          const status = stationStatus(station, isComplete);
          const disabled = status === 'locked';
          const suggested = activeHotspotId === station.id && status !== 'done';
          const justCompleted =
            completedPulseObjective &&
            station.objective === completedPulseObjective;

          return (
            <button
              key={station.id}
              className={`station-row station-${status} ${
                suggested ? 'station-suggested' : ''
              } ${justCompleted ? 'station-just-completed' : ''}`}
              onClick={() => {
                if (!disabled) onInteract(station);
              }}
              disabled={disabled}
            >
              <span className="station-index">{index + 1}</span>
              <span className="station-main">
                <span className="station-name">{station.label}</span>
                <span className="station-subtext">
                  {status === 'locked'
                    ? 'Locked until more clues are complete'
                    : status === 'done'
                      ? 'Reviewed'
                      : 'Ready to inspect'}
                </span>
              </span>
              <span className="station-state">{status}</span>
            </button>
          );
        })}
      </div>

      <div className="station-panel-footer">
        {openCount} available now
      </div>
    </aside>
  );
}

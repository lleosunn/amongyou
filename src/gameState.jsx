import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameContext } from './gameContext';

const HEALTH_START = 0.6;
const HEALTH_MIN = 0.2;
const HEALTH_DRAIN_PER_SEC = 0.001;

export function GameProvider({ children, initialStage = 1 }) {
  const [learnedMorphemes, setLearnedMorphemes] = useState(() => new Set());
  const [completedObjectives, setCompletedObjectives] = useState(() => new Set());
  const [currentStage, setCurrentStage] = useState(initialStage);
  const [health, setHealth] = useState(HEALTH_START);
  const [healthStabilized, setHealthStabilized] = useState(false);

  useEffect(() => {
    if (healthStabilized) return undefined;

    const interval = setInterval(() => {
      setHealth((prev) => Math.max(HEALTH_MIN, prev - HEALTH_DRAIN_PER_SEC));
    }, 1000);

    return () => clearInterval(interval);
  }, [healthStabilized]);

  const learn = useCallback((...morphemeIds) => {
    setLearnedMorphemes((prev) => {
      const next = new Set(prev);
      let changed = false;

      for (const id of morphemeIds.flat()) {
        if (!id) continue;
        if (next.has(id)) continue;
        next.add(id);
        changed = true;
      }

      if (!changed) return prev;
      return next;
    });
  }, []);

  const hasLearned = useCallback(
    (id) => learnedMorphemes.has(id),
    [learnedMorphemes]
  );

  const complete = useCallback((...objectiveIds) => {
    setCompletedObjectives((prev) => {
      const next = new Set(prev);
      let changed = false;

      for (const id of objectiveIds.flat()) {
        if (!id) continue;
        if (next.has(id)) continue;
        next.add(id);
        changed = true;
      }

      if (!changed) return prev;
      return next;
    });
  }, []);

  const isComplete = useCallback(
    (id) => completedObjectives.has(id),
    [completedObjectives]
  );

  const isUnlocked = useCallback(
    (room) => {
      if (!room) return false;
      if (!room.unlockedBy) return true;
      const required = Array.isArray(room.unlockedBy)
        ? room.unlockedBy
        : [room.unlockedBy];
      return required.every((obj) => completedObjectives.has(obj));
    },
    [completedObjectives]
  );

  const heal = useCallback((amount) => {
    setHealthStabilized(true);
    setHealth((prev) => Math.min(1, Math.max(HEALTH_MIN, prev + amount)));
  }, []);

  const value = useMemo(
    () => ({
      learnedMorphemes,
      completedObjectives,
      currentStage,
      setCurrentStage,
      health,
      heal,
      learn,
      hasLearned,
      complete,
      isComplete,
      isUnlocked,
    }),
    [
      learnedMorphemes,
      completedObjectives,
      currentStage,
      health,
      heal,
      learn,
      hasLearned,
      complete,
      isComplete,
      isUnlocked,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

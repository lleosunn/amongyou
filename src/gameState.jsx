import { useCallback, useEffect, useMemo, useState } from 'react';
import { GameContext } from './gameContext';

const HEALTH_START = 0.6;
const HEALTH_MIN = 0.2;
const HEALTH_DRAIN_PER_SEC = 0.001;
const SAVE_KEY = 'puacarda.gameProgress.v1';
const REMOVED_SAVED_MORPHEMES = new Set(['desa', 'desarom']);

function readSavedProgress() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return {
      learnedMorphemes: Array.isArray(parsed.learnedMorphemes)
        ? parsed.learnedMorphemes.filter(
            (id) => !REMOVED_SAVED_MORPHEMES.has(id)
          )
        : [],
      completedObjectives: Array.isArray(parsed.completedObjectives)
        ? parsed.completedObjectives
        : [],
    };
  } catch {
    return null;
  }
}

export function GameProvider({ children, initialStage = 1 }) {
  const [learnedMorphemes, setLearnedMorphemes] = useState(
    () => new Set(readSavedProgress()?.learnedMorphemes)
  );
  const [completedObjectives, setCompletedObjectives] = useState(
    () => new Set(readSavedProgress()?.completedObjectives)
  );
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
          learnedMorphemes: [...learnedMorphemes],
          completedObjectives: [...completedObjectives],
        })
      );
    } catch {
      // Progress persistence is best-effort; the in-memory game can continue.
    }
  }, [learnedMorphemes, completedObjectives]);

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

  const resetProgress = useCallback(() => {
    setLearnedMorphemes(new Set());
    setCompletedObjectives(new Set());
    setCurrentStage(initialStage);
    setHealth(HEALTH_START);
    setHealthStabilized(false);

    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(SAVE_KEY);
    } catch {
      // Progress persistence is best-effort; the in-memory reset still applies.
    }
  }, [initialStage]);

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
      resetProgress,
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
      resetProgress,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

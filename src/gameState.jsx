import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children, initialStage = 1 }) {
  const [learnedMorphemes, setLearnedMorphemes] = useState(() => new Set());
  const [completedObjectives, setCompletedObjectives] = useState(() => new Set());
  const [currentStage, setCurrentStage] = useState(initialStage);

  const learn = useCallback((...morphemeIds) => {
    setLearnedMorphemes((prev) => {
      const next = new Set(prev);
      for (const id of morphemeIds.flat()) next.add(id);
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
      for (const id of objectiveIds.flat()) next.add(id);
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

  const value = useMemo(
    () => ({
      learnedMorphemes,
      completedObjectives,
      currentStage,
      setCurrentStage,
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
      learn,
      hasLearned,
      complete,
      isComplete,
      isUnlocked,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameState() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return ctx;
}

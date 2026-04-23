import { createContext, useContext } from 'react';

export const GameContext = createContext(null);

export function useGameState() {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return ctx;
}

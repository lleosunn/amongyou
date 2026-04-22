import { useCallback, useEffect, useState } from 'react';
import { rooms, startingRoom } from './gameData';
import { useGameState } from './gameState';
import Room from './components/Room';
import NavArrows from './components/NavArrows';
import Minimap from './components/Minimap';
import Modal from './components/Modal';
import MorphemeInventory from './components/MorphemeInventory';
import { stage1 } from './stages/stage1';
import drawingImg from './assets/childs-drawing.svg';
import './App.css';

export default function App() {
  const [currentRoomId, setCurrentRoomId] = useState(startingRoom);
  const [modalContent, setModalContent] = useState(null);
  const [introShown, setIntroShown] = useState(false);
  const [drawingPromptShown, setDrawingPromptShown] = useState(false);

  const { learn, complete, isComplete, isUnlocked } = useGameState();
  const room = rooms[currentRoomId];

  useEffect(() => {
    if (!introShown && currentRoomId === 'pilotCabin') {
      setModalContent({
        ...stage1.introNarration,
        onComplete: () => setIntroShown(true),
      });
    }
  }, [introShown, currentRoomId]);

  useEffect(() => {
    if (!introShown) return;
    if (drawingPromptShown) return;
    if (isComplete(stage1.exploreCompletionObjective)) return;

    const allExplored = stage1.exploreHotspotIds.every((id) =>
      isComplete(`explore-${id.replace(/^pilot-/, '')}`)
    );
    if (allExplored) {
      complete(stage1.exploreCompletionObjective);
      setDrawingPromptShown(true);
      setModalContent({
        ...stage1.drawingPromptNarration,
      });
    }
  }, [introShown, drawingPromptShown, isComplete, complete]);

  const handleMove = useCallback(
    (nextRoomId) => {
      if (!nextRoomId) return;
      const nextRoom = rooms[nextRoomId];
      if (!nextRoom) return;
      if (!isUnlocked(nextRoom)) return;
      setCurrentRoomId(nextRoomId);
    },
    [isUnlocked]
  );

  const openDrawingPuzzle = useCallback(() => {
    setModalContent({
      ...stage1.drawingPuzzle,
      image: drawingImg,
      onSolve: () => {
        learn(stage1.drawingPuzzle.morphemesLearned);
        complete(stage1.drawingPuzzle.completionObjective);
        setTimeout(() => {
          setModalContent({
            ...stage1.solvedNarration,
          });
        }, 700);
      },
    });
  }, [learn, complete]);

  const handleInteract = useCallback(
    (hotspot) => {
      if (hotspot.content?.type === 'stage1-drawing') {
        openDrawingPuzzle();
        return;
      }

      if (hotspot.stage1Objective) {
        complete(hotspot.stage1Objective);
      }

      setModalContent(hotspot.content);
    },
    [complete, openDrawingPuzzle]
  );

  return (
    <>
      <div className="game">
        <Room key={currentRoomId} room={room} onInteract={handleInteract}>
          <Minimap currentRoomId={currentRoomId} />
          <NavArrows room={room} onMove={handleMove} />
          <MorphemeInventory />
        </Room>
      </div>
      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
      )}
    </>
  );
}

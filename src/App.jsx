import { useCallback, useEffect, useState } from 'react';
import { rooms, startingRoom } from './gameData';
import { useGameState } from './gameContext';
import Room from './components/Room';
import NavArrows from './components/NavArrows';
import Minimap from './components/Minimap';
import Modal from './components/Modal';
import MorphemeInventory from './components/MorphemeInventory';
import { stage1 } from './stages/stage1';
import { stage2 } from './stages/stage2';
import { stage3 } from './stages/stage3';
import drawingImg from './assets/childs-drawing.svg';
import './App.css';

export default function App() {
  const [currentRoomId, setCurrentRoomId] = useState(startingRoom);
  const [modalContent, setModalContent] = useState(null);

  const [s1IntroShown, setS1IntroShown] = useState(false);
  const [s1DrawingPromptShown, setS1DrawingPromptShown] = useState(false);
  const [s2IntroShown, setS2IntroShown] = useState(false);
  const [s3IntroShown, setS3IntroShown] = useState(false);

  const { learn, complete, isComplete, isUnlocked } = useGameState();
  const room = rooms[currentRoomId];

  useEffect(() => {
    if (!s1IntroShown && currentRoomId === 'pilotCabin') {
      const timeout = setTimeout(() => {
        setModalContent((current) =>
          current ?? {
            ...stage1.introNarration,
            onComplete: () => setS1IntroShown(true),
          }
        );
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [s1IntroShown, currentRoomId]);

  useEffect(() => {
    if (!s1IntroShown) return;
    if (s1DrawingPromptShown) return;
    if (isComplete(stage1.exploreCompletionObjective)) return;
    if (modalContent) return;

    const allExplored = stage1.exploreHotspotIds.every((id) =>
      isComplete(`explore-${id.replace(/^pilot-/, '')}`)
    );
    if (allExplored) {
      const timeout = setTimeout(() => {
        complete(stage1.exploreCompletionObjective);
        setS1DrawingPromptShown(true);
        setModalContent((current) =>
          current ?? { ...stage1.drawingPromptNarration }
        );
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [s1IntroShown, s1DrawingPromptShown, modalContent, isComplete, complete]);

  useEffect(() => {
    if (currentRoomId !== 'clinic') return;
    if (s2IntroShown) return;
    if (modalContent) return;

    const timeout = setTimeout(() => {
      setModalContent((current) =>
        current ?? {
          ...stage2.introNarration,
          onComplete: () => setS2IntroShown(true),
        }
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentRoomId, s2IntroShown, modalContent]);

  useEffect(() => {
    if (isComplete(stage2.completionObjective)) return;
    if (modalContent) return;
    if (!stage2.allObjectives.every((o) => isComplete(o))) return;

    const timeout = setTimeout(() => {
      complete(stage2.completionObjective);
      setModalContent((current) =>
        current ?? { ...stage2.completionNarration }
      );
    }, 700);

    return () => clearTimeout(timeout);
  }, [modalContent, isComplete, complete]);

  useEffect(() => {
    if (currentRoomId !== 'lab') return;
    if (s3IntroShown) return;
    if (modalContent) return;

    const timeout = setTimeout(() => {
      setModalContent((current) =>
        current ?? {
          ...stage3.introNarration,
          onComplete: () => setS3IntroShown(true),
        }
      );
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentRoomId, s3IntroShown, modalContent]);

  useEffect(() => {
    if (isComplete(stage3.completionObjective)) return;
    if (modalContent) return;
    if (!stage3.allObjectives.every((o) => isComplete(o))) return;

    const timeout = setTimeout(() => {
      complete(stage3.completionObjective);
      setModalContent((current) =>
        current ?? { ...stage3.completionNarration }
      );
    }, 700);

    return () => clearTimeout(timeout);
  }, [modalContent, isComplete, complete]);

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
          setModalContent({ ...stage1.solvedNarration });
        }, 700);
      },
    });
  }, [learn, complete]);

  const openDoorPuzzle = useCallback(() => {
    setModalContent({
      ...stage2.doorPuzzle,
      onSolve: () => {
        learn(stage2.doorPuzzle.morphemesLearned);
        complete(stage2.doorPuzzle.objective);
        setModalContent(null);
      },
    });
  }, [learn, complete]);

  const openTeachClue = useCallback(
    (clue) => {
      if (clue.morphemesLearned) learn(clue.morphemesLearned);
      if (clue.objective) complete(clue.objective);
      setModalContent({
        type: 'clue',
        title: clue.title,
        body: clue.body,
        note: clue.note,
      });
    },
    [learn, complete]
  );

  const openSequencePuzzle = useCallback(() => {
    setModalContent({
      ...stage3.sequencePuzzle,
      onSolve: () => {
        complete(stage3.sequencePuzzle.objective);
        setModalContent(null);
      },
    });
  }, [complete]);

  const handleInteract = useCallback(
    (hotspot) => {
      const ctype = hotspot.content?.type;

      if (ctype === 'stage1-drawing') {
        openDrawingPuzzle();
        return;
      }
      if (ctype === 'stage2-door') {
        openDoorPuzzle();
        return;
      }
      if (ctype === 'stage2-photos') {
        openTeachClue(stage2.photosClue);
        return;
      }
      if (ctype === 'stage2-bottles') {
        openTeachClue(stage2.bottlesClue);
        return;
      }
      if (ctype === 'stage2-refill') {
        openTeachClue(stage2.refillClue);
        return;
      }
      if (ctype === 'stage3-chamber') {
        openTeachClue(stage3.chamberClue);
        return;
      }
      if (ctype === 'stage3-logs') {
        openTeachClue(stage3.logsClue);
        return;
      }
      if (ctype === 'stage3-sequence') {
        openSequencePuzzle();
        return;
      }

      if (hotspot.objective) {
        complete(hotspot.objective);
      }
      if (hotspot.morphemesToLearn) {
        learn(hotspot.morphemesToLearn);
      }

      setModalContent(hotspot.content);
    },
    [complete, learn, openDrawingPuzzle, openDoorPuzzle, openTeachClue, openSequencePuzzle]
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

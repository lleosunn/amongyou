import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { rooms, startingRoom } from './gameData';
import { useGameState } from './gameContext';
import { getMorpheme } from './languageData';
import Room from './components/Room';
import NavArrows from './components/NavArrows';
import Minimap from './components/Minimap';
import Modal from './components/Modal';
import MorphemeInventory from './components/MorphemeInventory';
import HealthBar from './components/HealthBar';
import RoomStationPanel from './components/RoomStationPanel';
import { stage1 } from './stages/stage1';
import { stage2 } from './stages/stage2';
import { stage3 } from './stages/stage3';
import { stage4 } from './stages/stage4';
import './App.css';

const INTERACTIVE_TYPES = new Set([
  'choice',
  'builder',
  'conversation',
  'experiment',
  'matching',
  'prefix-wheel',
  'sequence',
  'translation-check',
  'visual-discovery',
]);

const DEV_ROOM_LOCK_OVERRIDE_KEY = 'amongyou.devRoomLocksBypassed';
const INTRO_BED_LABEL_HOTSPOT_ID = 'pilot-bed-label';

function getCompletionId(hotspot, content) {
  return content?.objective ?? content?.completionObjective ?? hotspot.objective;
}

function getLearnedIds(hotspot, content) {
  return content?.morphemesLearned ?? hotspot.morphemesToLearn ?? [];
}

function getRoomUnlockedByObjective(objectiveId) {
  return Object.values(rooms).find((room) => {
    if (!room.unlockedBy) return false;
    const required = Array.isArray(room.unlockedBy)
      ? room.unlockedBy
      : [room.unlockedBy];
    return required.includes(objectiveId);
  });
}

export default function App() {
  const [currentRoomId, setCurrentRoomId] = useState(startingRoom);
  const [modalContent, setModalContent] = useState(null);
  const [idleHint, setIdleHint] = useState(null);
  const [completedPulseObjective, setCompletedPulseObjective] = useState(null);
  const [unlockedPulseRoomId, setUnlockedPulseRoomId] = useState(null);
  const [wordToast, setWordToast] = useState(null);
  const [roomLocksBypassed, setRoomLocksBypassed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(DEV_ROOM_LOCK_OVERRIDE_KEY) === 'true';
  });
  const learnedRef = useRef(new Set());
  const pulseTimeoutRef = useRef(null);
  const unlockTimeoutRef = useRef(null);
  const introHintTimeoutRef = useRef(null);

  const [s1IntroShown, setS1IntroShown] = useState(false);
  const [s2IntroShown, setS2IntroShown] = useState(false);
  const [s3IntroShown, setS3IntroShown] = useState(false);
  const [s4IntroShown, setS4IntroShown] = useState(false);
  const [pendingVocabularyReview, setPendingVocabularyReview] = useState(false);
  const [bedLabelIntroPulseShown, setBedLabelIntroPulseShown] = useState(false);

  const {
    learn,
    complete,
    isComplete,
    isUnlocked,
    completedObjectives,
    learnedMorphemes,
    health,
    heal,
  } = useGameState();
  const room = rooms[currentRoomId];

  const visibleHotspots = useMemo(
    () =>
      (room.hotspots ?? []).filter((hotspot) => {
        if (!hotspot.requiresObjectives) return true;
        return hotspot.requiresObjectives.every((id) => isComplete(id));
      }),
    [room, isComplete]
  );

  const healthWarningOpacity = Math.max(
    0,
    Math.min(0.7, (0.35 - health) / 0.15)
  );

  useEffect(
    () => () => {
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
      if (introHintTimeoutRef.current) {
        clearTimeout(introHintTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      DEV_ROOM_LOCK_OVERRIDE_KEY,
      String(roomLocksBypassed)
    );
  }, [roomLocksBypassed]);

  useEffect(() => {
    const previous = learnedRef.current;
    const current = new Set(learnedMorphemes);
    const added = [...current].filter((id) => !previous.has(id));
    learnedRef.current = current;

    if (!added.length) return undefined;

    const label = added
      .map((id) => getMorpheme(id)?.blah ?? id)
      .slice(0, 4)
      .join(', ');
    const extra = added.length > 4 ? ` +${added.length - 4}` : '';

    const showTimeout = setTimeout(() => {
      setWordToast(`Learned: ${label}${extra}`);
    }, 0);
    const hideTimeout = setTimeout(() => setWordToast(null), 2200);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [learnedMorphemes]);

  const markObjectiveComplete = useCallback(
    (objectiveId, alreadyComplete = false) => {
      if (!objectiveId) return;

      complete(objectiveId);
      if (alreadyComplete) return;

      setCompletedPulseObjective(objectiveId);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = setTimeout(() => {
        setCompletedPulseObjective(null);
      }, 1400);

      const unlockedRoom = getRoomUnlockedByObjective(objectiveId);
      if (unlockedRoom) {
        setUnlockedPulseRoomId(unlockedRoom.id);
        if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = setTimeout(() => {
          setUnlockedPulseRoomId(null);
        }, 9000);
      }
    },
    [complete]
  );

  const completeVocabularyReview = useCallback(() => {
    const objectiveId = stage3.vocabularyReview.objective;
    markObjectiveComplete(objectiveId, isComplete(objectiveId));
    setPendingVocabularyReview(false);
    setModalContent(null);
  }, [isComplete, markObjectiveComplete]);

  useEffect(() => {
    if (currentRoomId !== stage1.room) return undefined;
    if (s1IntroShown) return undefined;
    if (modalContent) return undefined;

    const timeout = setTimeout(() => {
      setS1IntroShown(true);
      setModalContent((current) => current ?? { ...stage1.introNarration });
    }, 0);

    return () => clearTimeout(timeout);
  }, [s1IntroShown, currentRoomId, modalContent]);

  useEffect(() => {
    if (currentRoomId !== stage2.room) return;
    if (s2IntroShown) return;
    if (modalContent) return;

    const timeout = setTimeout(() => {
      setS2IntroShown(true);
      setModalContent((current) => current ?? { ...stage2.introNarration });
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentRoomId, s2IntroShown, modalContent]);

  useEffect(() => {
    if (bedLabelIntroPulseShown) return undefined;
    if (currentRoomId !== stage1.room) return undefined;
    if (!s1IntroShown) return undefined;
    if (modalContent) return undefined;

    if (isComplete(INTRO_BED_LABEL_HOTSPOT_ID)) {
      const timeout = setTimeout(() => setBedLabelIntroPulseShown(true), 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setBedLabelIntroPulseShown(true);
      setIdleHint({
        hotspotId: INTRO_BED_LABEL_HOTSPOT_ID,
        text: 'I should inspect the bed label first.',
      });

      if (introHintTimeoutRef.current) {
        clearTimeout(introHintTimeoutRef.current);
      }

      introHintTimeoutRef.current = setTimeout(() => {
        setIdleHint((current) =>
          current?.hotspotId === INTRO_BED_LABEL_HOTSPOT_ID ? null : current
        );
      }, 9000);
    }, 250);

    return () => clearTimeout(timeout);
  }, [
    bedLabelIntroPulseShown,
    currentRoomId,
    s1IntroShown,
    modalContent,
    isComplete,
  ]);

  useEffect(() => {
    if (isComplete(stage2.completionObjective)) return;
    if (modalContent) return;
    if (!stage2.allObjectives.every((objective) => isComplete(objective))) {
      return;
    }

    const timeout = setTimeout(() => {
      markObjectiveComplete(stage2.completionObjective);
      setModalContent((current) =>
        current ?? { ...stage2.completionNarration }
      );
    }, 700);

    return () => clearTimeout(timeout);
  }, [modalContent, isComplete, markObjectiveComplete, completedObjectives]);

  useEffect(() => {
    if (currentRoomId !== stage3.room) return;
    if (s3IntroShown) return;
    if (modalContent) return;

    const timeout = setTimeout(() => {
      setS3IntroShown(true);
      setModalContent((current) => current ?? { ...stage3.introNarration });
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentRoomId, s3IntroShown, modalContent]);

  useEffect(() => {
    if (isComplete(stage3.completionObjective)) return;
    if (modalContent) return;
    if (!stage3.allObjectives.every((objective) => isComplete(objective))) {
      return;
    }

    const timeout = setTimeout(() => {
      markObjectiveComplete(stage3.completionObjective);
      setPendingVocabularyReview(true);
      setModalContent((current) =>
        current ?? { ...stage3.completionNarration }
      );
    }, 700);

    return () => clearTimeout(timeout);
  }, [modalContent, isComplete, markObjectiveComplete, completedObjectives]);

  useEffect(() => {
    if (!pendingVocabularyReview) return undefined;
    if (modalContent) return undefined;
    if (isComplete(stage3.vocabularyReview.objective)) {
      const timeout = setTimeout(() => setPendingVocabularyReview(false), 0);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setModalContent((current) =>
        current ?? {
          ...stage3.vocabularyReview,
          onComplete: completeVocabularyReview,
        }
      );
    }, 250);

    return () => clearTimeout(timeout);
  }, [
    pendingVocabularyReview,
    modalContent,
    isComplete,
    completeVocabularyReview,
  ]);

  useEffect(() => {
    if (currentRoomId !== stage4.room) return;
    if (s4IntroShown) return;
    if (modalContent) return;

    const timeout = setTimeout(() => {
      setS4IntroShown(true);
      setModalContent((current) => current ?? { ...stage4.introNarration });
    }, 0);

    return () => clearTimeout(timeout);
  }, [currentRoomId, s4IntroShown, modalContent]);

  useEffect(() => {
    if (modalContent) return undefined;

    const nextHotspot = visibleHotspots.find(
      (hotspot) => !hotspot.objective || !isComplete(hotspot.objective)
    );

    if (!nextHotspot) return undefined;

    const timeout = setTimeout(() => {
      setIdleHint({
        hotspotId: nextHotspot.id,
        text: `I should inspect the ${nextHotspot.label.toLowerCase()}.`,
      });
    }, 20000);

    return () => clearTimeout(timeout);
  }, [modalContent, visibleHotspots, isComplete]);

  const handleMove = useCallback(
    (nextRoomId) => {
      if (!nextRoomId) return;
      const nextRoom = rooms[nextRoomId];
      if (!nextRoom) return;
      if (!roomLocksBypassed && !isUnlocked(nextRoom)) return;
      setIdleHint(null);
      setCurrentRoomId(nextRoomId);
    },
    [isUnlocked, roomLocksBypassed]
  );

  const applyContentOutcome = useCallback(
    (hotspot, content) => {
      const objectiveId = getCompletionId(hotspot, content);
      const alreadyComplete = objectiveId ? isComplete(objectiveId) : false;
      const learnedIds = getLearnedIds(hotspot, content);

      if (learnedIds.length) learn(learnedIds);
      if (objectiveId) markObjectiveComplete(objectiveId, alreadyComplete);
      if (content.healAmount && !alreadyComplete) heal(content.healAmount);

      if (content.afterSolve) {
        setTimeout(() => {
          setModalContent({ ...content.afterSolve });
        }, content.healAmount ? 1800 : 350);
      } else {
        setModalContent(null);
      }
    },
    [learn, markObjectiveComplete, heal, isComplete]
  );

  const openContent = useCallback(
    (hotspot) => {
      const content = hotspot.content;
      if (!content) return;

      if (INTERACTIVE_TYPES.has(content.type)) {
        setModalContent({
          ...content,
          stationLabel: hotspot.label,
          onSolve: () => applyContentOutcome(hotspot, content),
        });
        return;
      }

      const objectiveId = getCompletionId(hotspot, content);
      const alreadyComplete = objectiveId ? isComplete(objectiveId) : false;
      const learnedIds = getLearnedIds(hotspot, content);

      if (learnedIds.length) learn(learnedIds);
      if (objectiveId) markObjectiveComplete(objectiveId, alreadyComplete);
      if (content.healAmount && !alreadyComplete) heal(content.healAmount);

      setModalContent({ ...content, stationLabel: hotspot.label });
    },
    [applyContentOutcome, markObjectiveComplete, heal, isComplete, learn]
  );

  const handleInteract = useCallback(
    (hotspot) => {
      setIdleHint(null);
      openContent(hotspot);
    },
    [openContent]
  );

  const handleModalClose = useCallback(() => {
    if (modalContent?.type === 'vocabulary-review') {
      completeVocabularyReview();
      return;
    }

    setModalContent(null);
  }, [completeVocabularyReview, modalContent]);

  return (
    <>
      <div className="game">
        <div className="game-layout">
          <Room
            key={currentRoomId}
            room={room}
            activeHotspotId={idleHint?.hotspotId}
            completedPulseObjective={completedPulseObjective}
            onInteract={handleInteract}
          >
            <Minimap
              currentRoomId={currentRoomId}
              roomLocksBypassed={roomLocksBypassed}
            />
            <NavArrows
              room={room}
              onMove={handleMove}
              unlockedPulseRoomId={unlockedPulseRoomId}
              roomLocksBypassed={roomLocksBypassed}
            />
            <div className="hud">
              <HealthBar />
              <MorphemeInventory />
            </div>
            <button
              className={`dev-lock-toggle ${
                roomLocksBypassed ? 'enabled' : ''
              }`}
              onClick={() => setRoomLocksBypassed((current) => !current)}
              aria-pressed={roomLocksBypassed}
            >
              Dev Locks {roomLocksBypassed ? 'Off' : 'On'}
            </button>
            {idleHint && !modalContent && (
              <div className="idle-hint">{idleHint.text}</div>
            )}
            {wordToast && (
              <div className="word-toast" aria-live="polite">
                {wordToast}
              </div>
            )}
            {unlockedPulseRoomId && (
              <div className="room-event" aria-live="polite">
                {rooms[unlockedPulseRoomId]?.name ?? 'New room'} unlocked
              </div>
            )}
            <div
              className="health-warning"
              style={{ opacity: healthWarningOpacity }}
            />
          </Room>
          <RoomStationPanel
            room={room}
            activeHotspotId={idleHint?.hotspotId}
            completedPulseObjective={completedPulseObjective}
            onInteract={handleInteract}
          />
        </div>
      </div>
      {modalContent && (
        <Modal onClose={handleModalClose}>{modalContent}</Modal>
      )}
    </>
  );
}

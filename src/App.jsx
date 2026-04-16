import { useState, useCallback } from 'react';
import { rooms, startingRoom } from './gameData';
import Room from './components/Room';
import NavArrows from './components/NavArrows';
import Minimap from './components/Minimap';
import Modal from './components/Modal';
import './App.css';

export default function App() {
  const [currentRoomId, setCurrentRoomId] = useState(startingRoom);
  const [modalContent, setModalContent] = useState(null);
  const room = rooms[currentRoomId];

  const handleMove = useCallback((nextRoomId) => {
    if (nextRoomId && rooms[nextRoomId]) {
      setCurrentRoomId(nextRoomId);
    }
  }, []);

  const handleInteract = useCallback((hotspot) => {
    setModalContent(hotspot.content);
  }, []);

  return (
    <>
      <div className="game">
        <Room key={currentRoomId} room={room} onInteract={handleInteract}>
          <Minimap currentRoomId={currentRoomId} />
          <NavArrows room={room} onMove={handleMove} />
        </Room>
      </div>
      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>
          {modalContent}
        </Modal>
      )}
    </>
  );
}

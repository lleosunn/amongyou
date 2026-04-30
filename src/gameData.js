import pilotCabinImg from './assets/rooms/pilot_cabin.png';
import clinicImg from './assets/rooms/clinic.png';
import labImg from './assets/rooms/lab.png';
import commsRoomImg from './assets/rooms/comms_room.png';
import { roomConfigs, startingRoom } from './roomData';

const roomImages = {
  pilotCabin: pilotCabinImg,
  clinic: clinicImg,
  lab: labImg,
  commsRoom: commsRoomImg,
};

export const rooms = Object.fromEntries(
  Object.entries(roomConfigs).map(([id, room]) => [
    id,
    {
      ...room,
      image: roomImages[room.imageKey],
    },
  ])
);

export { startingRoom };

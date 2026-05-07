import planetDodaromImg from './assets/discovery/planet-dodarom.png';
import planetFannaromImg from './assets/discovery/planet-fannarom.png';
import crewPilotImg from './assets/discovery/crew-pilot.png';
import crewMedicImg from './assets/discovery/crew-medic.png';
import messageSelfImg from './assets/discovery/message-self.png';
import messageYouImg from './assets/discovery/message-you.png';
import clueBridgeRouteImg from './assets/discovery/clue-bridge-route.png';
import clueBridgeScannerImg from './assets/discovery/clue-bridge-scanner.png';
import clueBridgeTransportImg from './assets/discovery/clue-bridge-transport.png';
import clueClinicSignImg from './assets/discovery/clue-clinic-sign.png';
import clueDestinationMapImg from './assets/discovery/clue-destination-map.png';
import clueFlightSignImg from './assets/discovery/clue-flight-sign.png';
import clueLabSignImg from './assets/discovery/clue-lab-sign.png';
import clueMedicSelfImg from './assets/discovery/clue-medic-self.png';
import clueRefillMachineImg from './assets/discovery/clue-refill-machine.png';
import clueTreatmentAfterImg from './assets/discovery/clue-treatment-after.png';
import clueTreatmentBeforeImg from './assets/discovery/clue-treatment-before.png';
import clueTreatmentLogImg from './assets/discovery/clue-treatment-log.png';

export const puzzleAssets = {
  planetDodarom: planetDodaromImg,
  planetFannarom: planetFannaromImg,
  crewPilot: crewPilotImg,
  crewMedic: crewMedicImg,
  messageSelf: messageSelfImg,
  messageYou: messageYouImg,
  clueBridgeRoute: clueBridgeRouteImg,
  clueBridgeScanner: clueBridgeScannerImg,
  clueBridgeTransport: clueBridgeTransportImg,
  clueClinicSign: clueClinicSignImg,
  clueDestinationMap: clueDestinationMapImg,
  clueFlightSign: clueFlightSignImg,
  clueLabSign: clueLabSignImg,
  clueMedicSelf: clueMedicSelfImg,
  clueRefillMachine: clueRefillMachineImg,
  clueTreatmentAfter: clueTreatmentAfterImg,
  clueTreatmentBefore: clueTreatmentBeforeImg,
  clueTreatmentLog: clueTreatmentLogImg,
};

export function getPuzzleAsset(imageKey) {
  return imageKey ? puzzleAssets[imageKey] : null;
}

import securityImg from './assets/rooms/security.png';
import electricalImg from './assets/rooms/electrical.png';
import storageImg from './assets/rooms/storage.png';
import navigationImg from './assets/rooms/navigation.png';
import weaponsImg from './assets/rooms/weapons.png';

export const rooms = {
  security: {
    id: 'security',
    name: 'Security',
    color: '#e05555',
    image: securityImg,
    left: null,
    right: null,
    up: null,
    down: 'electrical',
    gridPos: { col: 0, row: -1 },
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical',
    color: '#e8c840',
    image: electricalImg,
    left: null,
    right: 'storage',
    up: 'security',
    down: null,
    gridPos: { col: 0, row: 0 },
    hotspots: [
      {
        id: 'electrical-screens',
        label: 'Control screens',
        x: '47%',
        y: '31%',
        w: '13%',
        h: '11%',
        content: {
          type: 'clue',
          title: 'Monitor Feed — Channel 7',
          body: 'ᛊᚨᛚ  ᚹᛟᚱ  ᛏᚨᚾ  ᛒᛖᛚᚨ',
          note: 'A message flickers on screen, repeating. The symbols feel almost familiar...',
        },
      },
    ],
  },
  storage: {
    id: 'storage',
    name: 'Storage',
    color: '#4a9eff',
    image: storageImg,
    left: 'electrical',
    right: 'navigation',
    up: null,
    down: null,
    gridPos: { col: 1, row: 0 },
  },
  navigation: {
    id: 'navigation',
    name: 'Navigation',
    color: '#50c878',
    image: navigationImg,
    left: 'storage',
    right: null,
    up: null,
    down: 'weapons',
    gridPos: { col: 2, row: 0 },
  },
  weapons: {
    id: 'weapons',
    name: 'Weapons',
    color: '#c77dff',
    image: weaponsImg,
    left: null,
    right: null,
    up: 'navigation',
    down: null,
    gridPos: { col: 2, row: 1 },
  },
};

export const startingRoom = 'electrical';

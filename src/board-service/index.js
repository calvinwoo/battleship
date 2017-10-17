import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCmvQ5x2U87UIIhNbw84E06yjiYWgfS0ck',
  authDomain: 'battleship-game-49fd0.firebaseapp.com',
  databaseURL: 'https://battleship-game-49fd0.firebaseio.com',
  projectId: 'battleship-game-49fd0',
  storageBucket: 'battleship-game-49fd0.appspot.com',
  messagingSenderId: '447819934813'
};

firebase.initializeApp(config);

const database = firebase.database();

const createInitialBoardState = () => {
  return {
    player1Board: [[0, 1], [2, 12], [3, 13]],
    player2Board: [[10, 11], [98, 99], [55, 65]],
    attacks: [],
    turn: 'player1'
  };
};

export const attack = (boardState, position) => {
  return {
    ...boardState,
    turn: boardState.turn === 'player1' ? 'player2' : 'player1',
    attacks: (boardState.attacks || []).concat(position)
  };
};

export const listen = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  const data = (await ref.once('value')).val();

  if (!data) {
    await ref.set(createInitialBoardState());
  }

  ref.on('value', callback);
};

export const unlisten = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  ref.off('value', callback);
};

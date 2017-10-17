import * as firebase from 'firebase';
import { intersection } from 'lodash';

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
  const addRandomShips = (ships) => {
    while (ships.length < 6) {
      const randomIndex = Math.floor(Math.random() * 25);
      let secondIndex = randomIndex + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.5 ? 5 : 1);
      const isRepeat = ships.some((ship) => ship.includes(randomIndex) || ship.includes(secondIndex));
      const isDisconnected = [randomIndex, secondIndex].every((index) => (index + 1) % 5 === 0 || index % 5 === 0);
      const isOffBoard = [randomIndex, secondIndex].some((index) => index < 0 || index > 24);

      if (!isRepeat && !isDisconnected && !isOffBoard) {
        ships.push([randomIndex, secondIndex]);
      }
    }
  };

  const ships = [];
  addRandomShips(ships);

  return {
    player1Board: ships.slice(0, 3),
    player2Board: ships.slice(3, 6),
    attacks: [],
    turn: 'player1'
  };
};

export const restartGame = (roomId) => {
  const ref = database.ref(`rooms/${roomId}`);
  return ref.set(createInitialBoardState());
};

export const checkWinner = (boardState) => {
  if (!boardState) {
    return undefined;
  }

  const player1Tiles = boardState.player1Board.reduce((a, b) => a.concat(b), []);
  const player2Tiles = boardState.player2Board.reduce((a, b) => a.concat(b), []);

  if (intersection(boardState.attacks, player1Tiles).length === player1Tiles.length) {
    return 'player2';
  }

  if (intersection(boardState.attacks, player2Tiles).length === player2Tiles.length) {
    return 'player1';
  }
};

export const attack = (boardState, roomId, position) => {
  const attacks = (boardState.attacks || []).concat(position);
  const turn = boardState.turn === 'player1' ? 'player2' : 'player1';
  const ref = database.ref(`rooms/${roomId}/`);
  return ref.update({ turn, attacks });
};

export const listen = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  const data = (await ref.once('value')).val();

  if (!data) {
    await restartGame(roomId);
  }

  ref.on('value', callback);
};

export const unlisten = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  ref.off('value', callback);
};

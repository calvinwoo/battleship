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

export const listen = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  const data = (await ref.once('value')).val();

  if (!data) {
    await ref.set([1, 2, 3]);
  }

  ref.on('value', callback);
};

export const unlisten = async (roomId, callback) => {
  const ref = database.ref(`rooms/${roomId}`);
  ref.off('value', callback);
};

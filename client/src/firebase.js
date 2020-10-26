import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyC-PSfNuedbh2V0wCxX3Ws_Kn9owg6wf4c',
    authDomain: 'netflix-clone-1b322.firebaseapp.com',
    databaseURL: 'https://netflix-clone-1b322.firebaseio.com',
    projectId: 'netflix-clone-1b322',
    storageBucket: 'netflix-clone-1b322.appspot.com',
    messagingSenderId: '332989700624',
    appId: '1:332989700624:web:9b3a8325adda8c752d0895',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };

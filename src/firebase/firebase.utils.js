import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAIrwrse_-gMgDYMgrkLK4Kk_GLRvHN6gI",
    authDomain: "crwn-db-46823.firebaseapp.com",
    databaseURL: "https://crwn-db-46823.firebaseio.com",
    projectId: "crwn-db-46823",
    storageBucket: "",
    messagingSenderId: "814708146201",
    appId: "1:814708146201:web:a363375b6dbe85b2"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export   const  fireStore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
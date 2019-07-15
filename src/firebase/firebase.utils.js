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

  export const createUserProfileDocument = async (userAuth, additionalData)  => {
    if(!userAuth) return;

    const userRef = fireStore.doc(`users/${userAuth.uid}`);

    const snapShot =await userRef.get()
    if(!snapShot.exists){
      const {displayName,email} =userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
        
      } catch (error) {
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  };
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export   const  fireStore = firebase.firestore();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});

  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
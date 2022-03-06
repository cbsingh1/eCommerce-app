import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: 'AIzaSyAClA3_5eBezTTbbV7eRbhl1bbw-5h3vqg',
    authDomain: 'ecommerce-app-2ccdc.firebaseapp.com',
    projectId: 'ecommerce-app-2ccdc',
    storageBucket: 'ecommerce-app-2ccdc.appspot.com',
    messagingSenderId: '640054615822',
    appId: '1:640054615822:web:413d0d50d3bcd83fd5815f'
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

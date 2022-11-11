import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA0raCdfH7iLJx8gjMrHsmK16ongA2rjhY",
  authDomain: "memory-40f31.firebaseapp.com",
  projectId: "memory-40f31",
  storageBucket: "memory-40f31.appspot.com",
  messagingSenderId: "747454525427",
  appId: "1:747454525427:web:1e085e67caf5b34a8e2c86"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};

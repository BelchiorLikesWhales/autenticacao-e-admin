import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAsmqnPGZS9jsuvCIAeqmFcllrSpPmYKIo",
  authDomain: "aula3-e0be9.firebaseapp.com",
  projectId: "aula3-e0be9",
  storageBucket: "aula3-e0be9.appspot.com",
  messagingSenderId: "785748823947",
  appId: "1:785748823947:web:fb29029d713f6b30c7298e",
  measurementId: "G-BDTPNZ2KNZ"
};
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};

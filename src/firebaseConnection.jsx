import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCLv_XJcBtiN8TLZD2lL-sSV72g-UzWJJM",
  authDomain: "aula-pw-dos-crias.firebaseapp.com",
  projectId: "aula-pw-dos-crias",
  storageBucket: "aula-pw-dos-crias.appspot.com",
  messagingSenderId: "684215394888",
  appId: "1:684215394888:web:0e5f732ce68f3f61d8ae7d"
};
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  export {db, auth};

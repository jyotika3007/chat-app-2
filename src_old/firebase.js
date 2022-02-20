
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCWvtPebPWBzknQPIWB6mRsf7av5T2tC_k",
    authDomain: "chat-app-729bc.firebaseapp.com",
    projectId: "chat-app-729bc",
    storageBucket: "chat-app-729bc.appspot.com",
    messagingSenderId: "201575923619",
    appId: "1:201575923619:web:033f9ada008f88b93c2416",
    measurementId: "G-CDFDKLWJ1G"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
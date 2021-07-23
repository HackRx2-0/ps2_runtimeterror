import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf_7t2oBXZOKX5mAWfJyotKuFCRtRj0to",
  authDomain: "chat-community-1ca50.firebaseapp.com",
  projectId: "chat-community-1ca50",
  storageBucket: "chat-community-1ca50.appspot.com",
  messagingSenderId: "19663095487",
  appId: "1:19663095487:web:415bba1310280c54ffa80a",
  measurementId: "G-2E4FYG6FBQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

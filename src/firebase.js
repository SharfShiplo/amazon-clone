import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCOyrISazi9vMYettKh0epeKPsGlKHUY3g",
  authDomain: "clone-78eed.firebaseapp.com",
  projectId: "clone-78eed",
  storageBucket: "clone-78eed.appspot.com",
  messagingSenderId: "932210715456",
  appId: "1:932210715456:web:5a7c8d2b68137a9bbe28a5",
  measurementId: "G-LGCQXXR6QS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

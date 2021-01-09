import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPgcEHuQn2AqwIMPxPNVnmSwGlAQeWyWk",
  authDomain: "flash-cards-e7975.firebaseapp.com",
  projectId: "flash-cards-e7975",
  storageBucket: "flash-cards-e7975.appspot.com",
  messagingSenderId: "175313580118",
  appId: "1:175313580118:web:55965d19478c73b66ccbf7",
  measurementId: "G-Y1G49WFNP7",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

const db = firebaseApp.firestore();
export { db };

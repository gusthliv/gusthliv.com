import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCOWUOnpG8faOY66Kf6yMHZi3EZceOTEvo",
  authDomain: "react-counters-21442.firebaseapp.com",
  databaseURL: "https://react-counters-21442.firebaseio.com",
  projectId: "react-counters-21442",
  storageBucket: "react-counters-21442.appspot.com",
  messagingSenderId: "481971746534"
});

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true
});

export default firestore;

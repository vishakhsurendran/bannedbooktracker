import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth";

//written with assistance of tutorial at https://www.youtube.com/watch?v=WpIDez53SK4
//and firebase documentation at https://firebase.google.com/docs
const firebaseConfig = {
  apiKey: "AIzaSyA0a-TVShIuVMLELFuQ_4uVyB7uBDxhgyE",
  authDomain: "banned-book-tracker.firebaseapp.com",
  projectId: "banned-book-tracker",
  storageBucket: "banned-book-tracker.firebasestorage.app",
  messagingSenderId: "882742275358",
  appId: "1:882742275358:web:53db709cbe1e1fd0ecad0f",
  measurementId: "G-V6RNFY4LZ7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore};
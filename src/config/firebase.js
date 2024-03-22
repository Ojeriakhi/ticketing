// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsrkauVeaxKcM3ovOZC7faVqf4TKRjRRY",
  authDomain: "fir-tut-4b6bc.firebaseapp.com",
  projectId: "fir-tut-4b6bc",
  storageBucket: "fir-tut-4b6bc.appspot.com",
  messagingSenderId: "648027469877",
  appId: "1:648027469877:web:822abc2f812d1ea52c997c",
  measurementId: "G-MCPSRFGTZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
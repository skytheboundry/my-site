// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDouE814BPBaYCD7LnESr0y_7t7UIlM0xc",
  authDomain: "my-app-db12b.firebaseapp.com",
  projectId: "my-app-db12b",
  storageBucket: "my-app-db12b.firebasestorage.app",
  messagingSenderId: "850117761776",
  appId: "1:850117761776:web:149d24ef62030874934035",
  measurementId: "G-Y7LLT6WDE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
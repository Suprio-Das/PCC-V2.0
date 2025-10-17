import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBCvxJ9IsjhIa1oUJv1xyWLNK2Mj68d_mY",
  authDomain: "pciu-computer-club.firebaseapp.com",
  projectId: "pciu-computer-club",
  storageBucket: "pciu-computer-club.firebasestorage.app",
  messagingSenderId: "85841489518",
  appId: "1:85841489518:web:54dac7932bf23e95d9007f",
  measurementId: "G-2FNR9PMFDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
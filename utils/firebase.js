import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDlcgKgQB7R8rV9sNbRoQatGT93s7zD658",
  authDomain: "fintech-5c43c.firebaseapp.com",
  projectId: "fintech-5c43c",
  storageBucket: "fintech-5c43c.appspot.com",
  messagingSenderId: "682000378813",
  appId: "1:682000378813:web:a99ed51678201196e180d4",
};

// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();

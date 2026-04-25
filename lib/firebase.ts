import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOchqAH20V4aLAQBp8cjk5KD3WxKBqlPY",
  authDomain: "blade-inner-circle.firebaseapp.com",
  projectId: "blade-inner-circle",
  storageBucket: "blade-inner-circle.firebasestorage.app",
  messagingSenderId: "446268181578",
  appId: "1:446268181578:web:c5b408e7e35c6e7578eab3",
  measurementId: "G-5KW01DDXCM"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

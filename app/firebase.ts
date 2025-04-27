import { getFirestore, serverTimestamp } from "firebase/firestore";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAerTcCUSfpTGJLeqz-DVnIxmIRtYfy8ag",
  authDomain: "hacktech25brjk.firebaseapp.com",
  projectId: "hacktech25brjk",
  storageBucket: "hacktech25brjk.firebasestorage.app",
  messagingSenderId: "260317907063",
  appId: "1:260317907063:web:46de9d9fbcd1df8025de72",
  measurementId: "G-Y03PZ06G30"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
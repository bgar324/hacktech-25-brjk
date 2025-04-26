  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAerTcCUSfpTGJLeqz-DVnIxmIRtYfy8ag",
  authDomain: "hacktech25brjk.firebaseapp.com",
  projectId: "hacktech25brjk",
  storageBucket: "hacktech25brjk.firebasestorage.app",
  messagingSenderId: "260317907063",
  appId: "1:260317907063:web:46de9d9fbcd1df8025de72",
  measurementId: "G-Y03PZ06G30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
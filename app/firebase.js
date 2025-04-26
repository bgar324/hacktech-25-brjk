// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// imports for documentation
import { collection, addDoc } from "firebase/firestore";

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

class userData{
  constructor (firstName, lastName, api, firestore){
    this.firstName = firstName;
    this.lastName = lastName;
    this.firestore = firestore;
  }

  // getters
  get firstName(){
    return this.firstName;
  }

  get lastName (){
    return this.lastName;
  }

  get api (){
    return this.api;
  }



  // setters
  set firstName(fn){
    if (fn) {
      this.firstName = fn;
    } else {
      console.error("Invalid First Name.");
    }
  }

  set lastName(ln){
    if (ln) {
      this.lastName = ln;
    } else {
      console.error("Invalid Last Name.");
    }
  }

  set api (key){
    if (key) {
      this.api = key;
    } else {
      console.error("Invalid.");
    }
  }

  toString(){
    
  }
}
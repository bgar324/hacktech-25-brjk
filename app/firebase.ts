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
  firstName: string;
  lastName: string;
  firestore: string;

  constructor (fn: string, ln: string, fs: string){
    this.firstName = fn;
    this.lastName = ln;
    this.firestore = fs;
  }

  // getters
  get getFirstName(): string {
    return this.firstName;
  }

  get getLastName(): string {
    return this.lastName;
  }

  get getFirestore(): string {
    return this.firestore;
  }

  // setters
  set setFirstName(fn: string){
    if (fn) {
      this.firstName = fn;
    } else {
      console.error("Invalid First Name.");
    }
  }

  set setLastName(ln: string){
    if (ln) {
      this.lastName = ln;
    } else {
      console.error("Invalid Last Name.");
    }
  }

  set setFirestore (key: string){
    if (key) {
      this.firestore = key;
    } else {
      console.error("Invalid.");
    }
  }

  toString(){
    return this.firstName + this.lastName + this.firestore;
  }

}
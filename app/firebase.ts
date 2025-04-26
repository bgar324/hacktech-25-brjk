// firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc
} from "firebase/firestore";

// Your web app's Firebase configuration (only once!)
const firebaseConfig = {
  apiKey: "AIzaSyAerTcCUSfpTGJLeqz-DVnIxmIRtYfy8ag",
  authDomain: "hacktech25brjk.firebaseapp.com",
  projectId: "hacktech25brjk",
  storageBucket: "hacktech25brjk.firebasestorage.app",
  messagingSenderId: "260317907063",
  appId: "1:260317907063:web:46de9d9fbcd1df8025de72",
  measurementId: "G-Y03PZ06G30"
};

// Initialize Firebase app + services
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// A single class to handle sign-in + Firestore write
class FirestoreAction {
  private user: UserCredential | null = null;

  async signInAndSaveUser() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      this.user = result;

      console.log("UID:", this.user.user.uid);
      console.log("Name:", this.user.user.displayName);

      // Write to Firestore
      const usersCol = collection(db, "users");
      await addDoc(usersCol, {
        name: this.user.user.displayName,
        email: this.user.user.email
      });

      console.log("User saved to Firestore");
    } catch (err) {
      console.error("Error during sign-in or Firestore write:", err);
    }
  }
}

// Wire up your button after DOM loads
const fire = new FirestoreAction();
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("readButton");
  btn?.addEventListener("click", () => fire.signInAndSaveUser());
});

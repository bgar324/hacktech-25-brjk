import { initializeApp,  } from "firebase/app"
import {getAuth, signInWithEmailAndPassword,UserCredential, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import firebase from "firebase/compat/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, collection, CollectionReference} from 'firebase/firestore'
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
const firestore = getFirestore();
const auth = getAuth(app);
class FireStoreAction{
    // firstName: string;
    // lastName: string;
    // collection: string;
    user: UserCredential | null = null;;
    constructor (fn: string, ln: string, cl:string){
    //   this.firstName = fn;
    //   this.lastName = ln;
    //   this.collection = cl
    }
  
    // // getters
    // get getFirstName(): string {
    //   return this.firstName;
    // }
  
    // get getLastName(): string {
    //   return this.lastName;
    // }
  
    
    // // setters
    // set setFirstName(fn: string){
    //   if (fn) {
    //     this.firstName = fn;
    //   } else {
    //     console.error("Invalid First Name.");
    //   }
    // }
    async newUser() {
        const provider = new GoogleAuthProvider();
        try {
            // Use 'await' to get the result from signInWithPopup, which is of type UserCredential
            const result: UserCredential = await signInWithPopup(auth, provider);
            this.user = result; // Save the UserCredential result
        
            // Access the user data from the 'user' property of UserCredential
            console.log(this.user.user.uid); // Access user UID
            console.log(this.user.user.displayName); // Access display name
        
            // Create a Firestore collection reference
            const userCollection = collection(firestore, 'user');
        
            // Add new user data to Firestore
            await addDoc(userCollection, {
                name: this.user.user.displayName, // Accessing user display name
                email: this.user.user.email,       // Accessing user email
            });
        
            } catch (error) {
            console.error("Error signing in: ", error);
            }
        }
    
    // set setLastName(ln: string){
    //   if (ln) {
    //     this.lastName = ln;
    //   } else {
    //     console.error("Invalid Last Name.");
    //   }
    // }
  
}  
var fire = new FireStoreAction("hello world", "hello world", "cl")
//Listen for button press
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('readButton');
    button?.addEventListener('click', fire.newUser);
  });
//Writes to databsae
// async function writeDataBase(){
//   //Prompts for Google Login
//       const userDataDocument = collection(firestore, 'first')
//       async function addNewDoc() {
//         await addDoc(userDataDocument, {
//           uid: user.uid,
//           milesDriven: '100m',
//           meatEaten: '16oz',
//           laptopUse: 'y'
//         })
  
//       }
//       addNewDoc()
//     })
//     .catch((error) => {
//       console.error(error.message);
//     });

  // const milesDrivenElement= (<HTMLInputElement>document.getElementById("milesDriven")).value;
  // const meatEaten =  (<HTMLInputElement>document.getElementById("meatEaten")).value;
  // const labtopUsed = (<HTMLInputElement>document.getElementById("labtopUsed")).value;
  // const nameCollecition = collection(firestore, 'first')
  // async function addNewDocument(){
  //   const newDoc = await addDoc(nameCollecition, {
  //     milesDriven:milesDrivenElement,
  //     meatEaten: meatEaten,
  //     labtopUsed: labtopUsed
  //   });
  // }

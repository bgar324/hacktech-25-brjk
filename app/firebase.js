"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAerTcCUSfpTGJLeqz-DVnIxmIRtYfy8ag",
    authDomain: "hacktech25brjk.firebaseapp.com",
    projectId: "hacktech25brjk",
    storageBucket: "hacktech25brjk.firebasestorage.app",
    messagingSenderId: "260317907063",
    appId: "1:260317907063:web:46de9d9fbcd1df8025de72",
    measurementId: "G-Y03PZ06G30"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var firestore = (0, firestore_1.getFirestore)();
var auth = (0, auth_1.getAuth)(app);
var FireStoreAction = /** @class */ (function () {
    function FireStoreAction(fn, ln, cl) {
        // firstName: string;
        // lastName: string;
        // collection: string;
        this.user = null;
        //   this.firstName = fn;
        //   this.lastName = ln;
        //   this.collection = cl
    }
    ;
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
    FireStoreAction.prototype.newUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, result, userCollection, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new auth_1.GoogleAuthProvider();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, auth_1.signInWithPopup)(auth, provider)];
                    case 2:
                        result = _a.sent();
                        this.user = result; // Save the UserCredential result
                        // Access the user data from the 'user' property of UserCredential
                        console.log(this.user.user.uid); // Access user UID
                        console.log(this.user.user.displayName); // Access display name
                        userCollection = (0, firestore_1.collection)(firestore, 'user');
                        // Add new user data to Firestore
                        return [4 /*yield*/, (0, firestore_1.addDoc)(userCollection, {
                                name: this.user.user.displayName, // Accessing user display name
                                email: this.user.user.email, // Accessing user email
                            })];
                    case 3:
                        // Add new user data to Firestore
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error signing in: ", error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FireStoreAction;
}());
var fire = new FireStoreAction("hello world", "hello world", "cl");
//Listen for button press
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('readButton');
    button === null || button === void 0 ? void 0 : button.addEventListener('click', fire.newUser);
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

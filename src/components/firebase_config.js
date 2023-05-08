// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQPUZNVFVMWhGziaG_yg9LTuxI8Op-zgs",
  authDomain: "vijay-react-fire.firebaseapp.com",
  databaseURL: "https://vijay-react-fire-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vijay-react-fire",
  storageBucket: "vijay-react-fire.appspot.com",
  messagingSenderId: "421298202426",
  appId: "1:421298202426:web:16edce9e3682496eb91203"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
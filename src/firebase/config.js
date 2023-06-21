// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import 'firebase/firebase'
import 'firebase/storage'
import 'firebase/firestore'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwCGHUmGDL8svib0KrMIRUaNjypUlBAjQ",
  authDomain: "landfi.firebaseapp.com",
  projectId: "landfi",
  storageBucket: "landfi.appspot.com",
  messagingSenderId: "837387142396",
  appId: "1:837387142396:web:f7e355bb5ddb56ec1b8379",
  measurementId: "G-G4JVQ1FL0V"
};

// Initialize Firebase
  const app= initializeApp(firebaseConfig);
  export default app
  export const db = getFirestore(app);
// const db= firebase.firestore()

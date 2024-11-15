// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx8NNBAztwyIdFez1yCDvbhIVpWFI1IFA",
  authDomain: "health-detect-e96ac.firebaseapp.com",
  databaseURL: "https://health-detect-e96ac-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "health-detect-e96ac",
  storageBucket: "health-detect-e96ac.firebasestorage.app",
  messagingSenderId: "181551028817",
  appId: "1:181551028817:web:3dfeaea1df50fd80d93670",
  measurementId: "G-RCEHQQXRMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
  })
  
  export { db };
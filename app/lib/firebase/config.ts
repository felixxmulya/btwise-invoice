// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEet0MIVfAGp_9QEe7FNqiMk-DTDRvsmQ",
  authDomain: "btwise-invoice.firebaseapp.com",
  projectId: "btwise-invoice",
  storageBucket: "btwise-invoice.firebasestorage.app",
  messagingSenderId: "694929548290",
  appId: "1:694929548290:web:a1addb7501372b4a60331b",
  measurementId: "G-6MHZXSDYW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
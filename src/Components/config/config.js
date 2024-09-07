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
    apiKey: "AIzaSyC7PaLPrzFcSCKJAgSxkne_PYo2uUmnUDk",
    authDomain: "zencart-f9c64.firebaseapp.com",
    projectId: "zencart-f9c64",
    storageBucket: "zencart-f9c64.appspot.com",
    messagingSenderId: "194322422712",
    appId: "1:194322422712:web:8a4cf3cfab8d77739b8d4d",
    measurementId: "G-SJNREQT25P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { analytics, firestore, auth }
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbXhz3WoP8h7R0_3Jq3z6G7pR_UmrxMKE",
  authDomain: "user-email-password-auth-2c4be.firebaseapp.com",
  projectId: "user-email-password-auth-2c4be",
  storageBucket: "user-email-password-auth-2c4be.firebasestorage.app",
  messagingSenderId: "1032585258793",
  appId: "1:1032585258793:web:20b3b35253f76d049cb938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
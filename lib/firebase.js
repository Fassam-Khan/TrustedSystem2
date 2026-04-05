// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAHP0oExoMZGEoEF5WT8QVypMSD5rx9_U",
  authDomain: "trustedsystem-1a293.firebaseapp.com",
  projectId: "trustedsystem-1a293",
  storageBucket: "trustedsystem-1a293.firebasestorage.app",
  messagingSenderId: "1032529121095",
  appId: "1:1032529121095:web:8087af86ddae3311f84662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
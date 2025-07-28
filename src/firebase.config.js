import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwDihqXa1OZ8MK1-Jri6y-8JgNvrJ0kxk",
  authDomain: "rentaldressapp.firebaseapp.com",
  projectId: "rentaldressapp",
  storageBucket: "rentaldressapp.firebasestorage.app",
  messagingSenderId: "550402960573",
  appId: "1:550402960573:web:cbfc03b0e50943d036dbd4",
  measurementId: "G-T6TCB5F7D1"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

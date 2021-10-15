// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

// Initialize Firebase
const firebaseAuthentication = () => {
    return initializeApp(firebaseConfig);
}

export default firebaseAuthentication;

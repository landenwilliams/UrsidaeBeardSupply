// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwK7W1WKEFoyhRuKtBEMDqmW38mN098yo",
  authDomain: "ursidae-7cb1b.firebaseapp.com",
  projectId: "ursidae-7cb1b",
  storageBucket: "ursidae-7cb1b.appspot.com",
  messagingSenderId: "366413980640",
  appId: "1:366413980640:web:3dbda0889ad83933dec185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
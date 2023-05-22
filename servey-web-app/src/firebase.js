// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD1nheP-GkmtxNhzZnMyhWvzcTYhrUUfQ",
  authDomain: "mscthesis-5b0a3.firebaseapp.com",
  projectId: "mscthesis-5b0a3",
  storageBucket: "mscthesis-5b0a3.appspot.com",
  messagingSenderId: "49758902366",
  appId: "1:49758902366:web:3b2f7d152209ff6494bccf",
  measurementId: "G-7X0KFC6NS4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
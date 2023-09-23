import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm7RjaJQgWCVc3O0GgHj_HszFKb98lIDE",
  authDomain: "nexchat-mern.firebaseapp.com",
  projectId: "nexchat-mern",
  storageBucket: "nexchat-mern.appspot.com",
  messagingSenderId: "520964485266",
  appId: "1:520964485266:web:d887e7fdf003df56acb64b",
  measurementId: "G-8T296MFQCD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);

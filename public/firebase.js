// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkIE_9AFvUZbCkevwrsbDapt56MXAfSqs",
  authDomain: "react-todolist-project.firebaseapp.com",
  projectId: "react-todolist-project",
  storageBucket: "react-todolist-project.appspot.com",
  messagingSenderId: "900891682142",
  appId: "1:900891682142:web:728fb9a54d4cb85eab9bcf",
  measurementId: "G-Q9T9N5C5JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Get a Firestore instance
const db = getFirestore(app);

export default db;

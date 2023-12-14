// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBroWrVy-ULYA3KAmQWQ0s_n0d4NTQ08bk",
  authDomain: "podcast-platform-f9721.firebaseapp.com",
  projectId: "podcast-platform-f9721",
  storageBucket: "podcast-platform-f9721.appspot.com",
  messagingSenderId: "39608943830",
  appId: "1:39608943830:web:dae4ad5632cba7e560f577",
  measurementId: "G-HKEC7946G6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);
export {auth,db,storage};
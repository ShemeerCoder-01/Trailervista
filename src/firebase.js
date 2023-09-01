// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDraUoFw4ETsW7KlvnPWnE5U_m5VjrOA3Q",
  authDomain: "movie-app-clone-52e8a.firebaseapp.com",
  projectId: "movie-app-clone-52e8a",
  storageBucket: "movie-app-clone-52e8a.appspot.com",
  messagingSenderId: "312913031116",
  appId: "1:312913031116:web:2cea9cc98f8ae8fe45b769"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {auth,provider};
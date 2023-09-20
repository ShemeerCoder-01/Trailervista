import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

console.log(process.env.REACT_APP_FIREBASE_API_KEY);
console.log("domain",process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "movie-app-clone-52e8a",
  storageBucket: "movie-app-clone-52e8a.appspot.com",
  messagingSenderId: "312913031116",
  appId: "1:312913031116:web:2cea9cc98f8ae8fe45b769"
};


const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {auth,provider};
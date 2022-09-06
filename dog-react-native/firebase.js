// syntac for firebase 9 is different
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXVPNKwZcsbFvdLusifDf7hz1aLhO156M",
  authDomain: "initial-testing-72d36.firebaseapp.com",
  databaseURL:
    "https://initial-testing-72d36-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "initial-testing-72d36",
  storageBucket: "initial-testing-72d36.appspot.com",
  messagingSenderId: "297579190404",
  appId: "1:297579190404:web:b7af2d6be1684f3ad20ad1",
  measurementId: "G-9M0R5FYV6G",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {});
export { auth };

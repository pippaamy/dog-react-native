import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { dataBase } from "./firebase";

// Reference to right dataset in the firestore database
const userData = doc(dataBase, "USER Data collection", "USER DATA");
const badgeData = collection(dataBase, "badges")


function getBadges(breed) {
  return getDocs(badgeData).then((res) => {
    res.docs.map((badge) => {
      const parseBadge = badge.data();
      if (parseBadge.breed === breed) {
        return parseBadge;
      }
    });
  });
}

function addUserToFirestore(user) {
  //takes user object as argument, user = userCredentials.user
  const { displayName, email, uid } = user;
  return updateDoc(userData, {
    [uid]: { displayName, uid, email, dogsCaught: [], friends: [] },
  });
  // adds user object to database with extra properties for the game
}
function getUserDatabyUID(uid) {
  // uid = user.uid
  return getDoc(userData).then((res) => {
    const data = res.data()[uid];
    return data;
  });
  /* returns object of the form
      { 
        uid: 123123XX2343,
      email: joe@mama.com
      displayName: Rick Astley,
      dogsCaught: [pomeranian,husky],
      friends: [97886XX564, 453VDDH456 ]
      // friends are stored using uid
      }
      */
}
function getUserData() {
  return getDoc(userData).then((res) => {
    const data = res.data();
    return data;
  });
  /* returns object of the form
      {
        123123XX2343: { 
          uid: 123123XX2343,
        email: joe@mama.com
        displayName: Rick Astley,
        dogsCaught: [pomeranian,husky],
        friends: [97886XX564, 453VDDH456 ]
        },
        97886XX564:{....}
        // individual users are stored in objects with their uid as the key
      */
}

function addFriend(friendId) {
  const uid_friends =
    //  loggedInUser.uid+  <----need to find a way to access this
    ".friends";

  updateDoc(userData, {
    [uid_friends]: arrayUnion(friendId),
  })
    .then((res) => console.log({ res }))
    .catch((error) => console.log({ error, msg: "while adding friend" }));
}

function addCaughtDog(dogName) {
  const uid_dogs =
    //  loggedInUser.uid+  <----need to find a way to access this
    ".dogsCaught";
  updateDoc(userData, {
    [uid_dogs]: arrayUnion(dogName),
  })
    .then((res) => console.log({ res }))
    .catch((error) => console.log({ error, msg: "while adding caught dog" }));
}
// we probably wont need google login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((userCredential) => {
      const { user } = userCredential;
      addUserToFirestore(user);
      loggedInUser = user;
      welcomeMessage(user);
    })
    .catch((error) => console.log({ error }));
}
function emailLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // loggedInUser=user
      // welcomeMessage(user)
      // ...
    })
    .catch((error) =>
      console.log({ error, msg: "while logging in with email" })
    );
}
function createEmailAndUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // welcomeMessage(user)
      addUserToFirestore(user);
      return user.uid;
    })
    .then((uid) => {
      return getUserDatabyUID(uid);
    })
    .then((user) => {
      // loggedInUser=user
    })
    .catch((error) => console.log({ error, msg: "while creating user" }));
}

const signOut = () => {
  auth
    .signOut()
    .then((res) => {
      // welcome.innerHTML='logged out!'
      // loggedInUser={}
    })
    .catch((error) => console.log({ error, msg: "while signing out" }));
};

// auth.onAuthStateChanged(user=>console.log(user))
export {
  userData,
  signOut,
  createEmailAndUser,
  emailLogin,
  googleLogin,
  addCaughtDog,
  addFriend,
  getUserDatabyUID,
  addUserToFirestore,
  getUserData,
  getBadges,
};

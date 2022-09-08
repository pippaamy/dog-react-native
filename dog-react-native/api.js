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
const userCollection = collection(dataBase, "USER DATA");
const userDoc = (uid) => doc(dataBase, "USER DATA", uid);
const badgeData = collection(dataBase, "badges");

function getBadges(breed) {
  // take the breed name as an argument
  return getDocs(badgeData).then((res) => {
    res.docs.map((badge) => {
      const parseBadge = badge.data();
      if (parseBadge.breed === breed) {
        return parseBadge;
        // provides all info on the breed
      }
    });
  });
}
function getAllBadges() {
  return getDocs(badgeData).then((res) => {
    res.docs.map((badge) => badge.data());
  });
}
function getUserData() {
  return getDocs(userCollection).then((res) => {
    const documents = res.docs;
    return documents.map((doc) => doc.data());
  });
  /* returns array of the form
      [
         { 
          uid: 123123XX2343,
        email: joe@mama.com
        displayName: Rick Astley,
        dogsCaught: [pomeranian,husky],
        friends: [97886XX564, 453VDDH456 ]
        },
        {....}
      ]
        // individual users are stored in objects with their uid as the key
      */
}

function addUserToFirestore(user) {
  //takes user object as argument, user = userCredentials.user
  const { displayName, email, uid } = user;
  return setDoc(doc(dataBase, "USER DATA", user.uid), {
    displayName,
    uid,
    email,
    dogsCaught: [],
    friends: [],
    imagePaths: [],
  });
  // adds user object to database with extra properties for the game
}

function getUserDatabyUID(uid) {
  // uid = user.uid
  return getDoc(userDoc(uid)).then((res) => {
    const data = res.data();
    return data;
  });
  /* returns object of the form
      { 
        uid: 123123XX2343,
      email: joe@mama.com
      displayName: Rick Astley,
      dogsCaught: [pomeranian,husky],
      friends: [97886XX564, 453VDDH456 ]
      // friends are stored using uid,
      imagePaths:['123123124','2524352435235']
      }
      */
}

function addImagePath(imagePath) {
  return auth.onAuthStateChanged((user) => {
    const { uid } = user;
    return updateDoc(userDoc(uid), {
      imagePaths: arrayUnion(imagePath),
    }).catch((error) => console.log({ error, msg: "while adding Image" }));
  });
}
function addFriend(friendId) {
  return auth.onAuthStateChanged((user) => {
    updateDoc(userDoc(user.uid), {
      friends: arrayUnion(friendId),
    }).catch((error) => console.log({ error, msg: "while adding friend" }));
  });
}

function addCaughtDog(dogName) {
  return auth.onAuthStateChanged((user) => {
    updateDoc(userDoc(user.uid), {
      dogsCaught: arrayUnion(dogName),
    }).catch((error) => console.log({ error, msg: "while adding caught dog" }));
  });
}

function emailLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.displayName || user.email + "logged in!");
      return userCredential;
    })
    .catch((error) =>
      console.log({ error, msg: "while logging in with email" })
    );
}
function createEmailAndUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUserToFirestore(user);
      console.log(
        user.displayName || user.email + "user created and logged in!"
      );
      return userCredential;
    })
    .catch((error) => console.log({ error, msg: "while creating user" }));
}

const signOut = () => {
  return auth
    .signOut()
    .then((res) => {
      console.log("signed out");
      return res;
    })
    .catch((error) => console.log({ error, msg: "while signing out" }));
};

export {
  userData,
  getAllBadges,
  signOut,
  createEmailAndUser,
  emailLogin,
  addCaughtDog,
  addFriend,
  getUserDatabyUID,
  addUserToFirestore,
  getUserData,
  getBadges,
  addImagePath,
};

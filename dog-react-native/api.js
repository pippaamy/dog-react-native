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

function getBadges(breed, catchFunction) {
  // take the breed name as an argument
  return getDocs(badgeData)
    .then((res) => {
      res.docs.map((badge) => {
        const parseBadge = badge.data();
        if (parseBadge.breed === breed) {
          return parseBadge;
          // provides all info on the breed
        }
      });
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ error }, "error while getting badge");
        })
    );
}
function getAllBadges(catchFunc) {
  return getDocs(badgeData)
    .then((res) => {
      res.docs.map((badge) => badge.data());
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ error }, "error while getting badges");
        })
    );
}
function getUserData(catchFunc) {
  return getDocs(userCollection)
    .then((res) => {
      const documents = res.docs;
      return documents.map((doc) => doc.data());
    })
    .catch(
      catchFunction ||
        ((error) => {
          console.log({ error }, "error while getting user data");
        })
    );
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

function addUserToFirestore(user, catchFunction) {
  //takes user object as argument, user = userCredentials.user
  const { displayName, email, uid } = user;
  return setDoc(doc(dataBase, "USER DATA", user.uid), {
    displayName,
    uid,
    email,
    dogsCaught: [],
    friends: [],
    imagePaths: [],
  }).catch(catchFunction || console.log);
  // adds user object to database with extra properties for the game
}

function getUserDatabyUID(uid, catchFunction) {
  // uid = user.uid
  return getDoc(userDoc(uid))
    .then((res) => {
      const data = res.data();
      return data;
    })
    .catch(catchFunction || console.log);
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

function addImagePath(imagePath, catchFunction) {
  return auth.onAuthStateChanged((user) => {
    const { uid } = user;
    return updateDoc(userDoc(uid), {
      imagePaths: arrayUnion(imagePath),
    }).catch(
      catchFunction ||
        ((error) => console.log({ error, msg: "while adding Image" }))
    );
  });
}
function addProfilePic(path, catchFunction) {
  return auth.onAuthStateChanged((user) => {
    const { uid } = user;
    return updateDoc(userDoc(uid), {
      profilePic: path,
    }).catch(
      catchFunction ||
        ((error) => {
          console.log({ error, msg: "while adding Profile Image" });
        })
    );
  });
}
function addFriend(friendId, catchFunction) {
  return auth.onAuthStateChanged((user) => {
    updateDoc(userDoc(user.uid), {
      friends: arrayUnion(friendId),
    }).catch(
      catchFunction ||
        ((error) => console.log({ error, msg: "while adding friend" }))
    );
  });
}

function addCaughtDog(dogName, catchFunction) {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      updateDoc(userDoc(user.uid), {
        dogsCaught: arrayUnion(dogName),
      }).catch(
        catchFunction ||
          ((error) => console.log({ error, msg: "while adding caught dog" }))
      );
    } else console.log("not logged in");
  });
}

function emailLogin(email, password, catchFunction) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.displayName || user.email + "logged in!");
      return userCredential;
    })
    .catch(
      catchFunction ||
        ((error) => console.log({ error, msg: "while logging in with email" }))
    );
}
function createEmailAndUser(email, password, catchFunction) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUserToFirestore(user);
      console.log(
        user.displayName || user.email + "user created and logged in!"
      );
      return userCredential;
    })
    .catch(
      catchFunction ||
        ((error) => console.log({ error, msg: "while creating user" }))
    );
}

const signOut = (catchFunction) => {
  return auth
    .signOut()
    .then((res) => {
      console.log("signed out");
      return res;
    })
    .catch(
      catchFunction ||
        ((error) => console.log({ error, msg: "while signing out" }))
    );
};
function useLoggedInUser(functionWithUserAsParameter){
  auth.onAuthStateChanged((user)=>{
    if(user){
        functionWithUserAsParameter(user)
  } else console.log('not logged in')})
}

export {
  useLoggedInUser,
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
  addProfilePic,
};

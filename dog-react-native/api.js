import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
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
function getAllBadges(catchFunction) {
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
function getUserData(catchFunction) {
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
    const { uid } = auth.currentUser
    return updateDoc(userDoc(uid), {
      imagePaths: arrayUnion(imagePath),
    }).catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding Image", error });
    }))
}
function addProfilePic(path, catchFunction) {
 
    const { uid } = auth.currentUser
    return updateDoc(userDoc(uid), {
      profilePic: path,
    }).catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding Profile Image", error });
    }));
}
function addProfilePicURL_db_only(URL, catchFunction) {
    const { uid } = auth.currentUser
    return updateDoc(userDoc(uid), {
      photoURL: URL,
    })
    .then((res)=>{console.log('profile pic updated')
  return res})
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding Profile Image", error });
    }));
}
function addFriend(friendId, catchFunction) {
  return updateDoc(userDoc(auth.currentUser.uid), {
      friends: arrayUnion(friendId),
    }).then(()=>console.log('friend added'))
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding friend", error });
    }));

}
function addCaughtDog(dogName, catchFunction) {
    if (auth.currentUser) {
      updateDoc(userDoc(auth.currentUser.uid), {
        dogsCaught: arrayUnion(dogName),
      }).then(()=>console.log('caught dog added'))
      .catch(catchFunction||((error) => {
        console.log({ errorMessage: error.message, msg: "while adding caught dog",error });
      }));
    } else console.log("not logged in");
}
function emailLogin(email, password, catchFunction) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.displayName || user.email + "logged in!");
      return userCredential;
    })
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while logging in with email", error });
    }));
}
function createEmailAndUser(email, password, username,catchFunction) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUserToFirestore(user);
      console.log(
        user.displayName || user.email + "user created and logged in!"
      );
      return userCredential;
    })
    .then(()=>patchProfile(username,'https://cdn-icons-png.flaticon.com/512/1250/1250689.png',catchFunction))
    .then(()=>username?addDisplayNameToUserDatabase(username):null)
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message,msg: "while creating user" ,error });
    }));
}
const signOut = (catchFunction) => {
  return auth
    .signOut()
    .then((res) => {
      console.log("signed out");
      return res;
    })
    .catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message,msg:'while signing out', error });
    }));
};
function useLoggedInUser(functionWithUserAsParameter){
  return auth.onAuthStateChanged((user)=>{
    if(user){
        functionWithUserAsParameter(user)
  } else console.log('not logged in')})
}
function patchProfile(displayName,photoURL, newEmail, newPassword, catchFunction){
  const updateObj={}
  let updateStr=''
  if(displayName) {updateObj.displayName= displayName
  updateStr+='Name updated,'}
  if (photoURL) {updateObj.photoURL=photoURL
  updateStr+='photo updated,'}
  return updateProfile(auth.currentUser, updateObj).then((res) => {
   console.log(updateStr); 
   if (displayName )return addDisplayNameToUserDatabase(displayName)
  }).then(()=>{ if (photoURL) return addProfilePicURL_db_only(photoURL)})
  .then(()=>{
    console.log('database updated');
   return newEmail? setNewEmail(newEmail):null})
  .then(()=>{newEmail? console.log('email updated'):null 
  return newPassword?setPassword(newPassword):null})
  .then(()=>newPassword?console.log('password updated'):null)
  .catch(catchFunction||((error) => {
    console.log({ errorMessage: error.message,msg: "while updating user" ,error });
  }));
}
function addDisplayNameToUserDatabase(displayName, catchFunction) {
    const {uid}= auth.currentUser
    return displayName? updateDoc(userDoc(uid), {
      displayName
    }).catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding Display Name", error });
    }))
    : updateDoc(userDoc(uid), {
    }).catch(catchFunction||((error) => {
      console.log({ errorMessage: error.message, msg: "while adding Display Name", error });
    }))
  
}
function setPassword(newPassword,catchFunction){
  return updatePassword(auth.currentUser, newPassword).then(() => {
    console.log('Password changed');
  }).catch(catchFunction||((error) => {
    console.log({ errorMessage: error.message,msg: "while updating password" ,error });
  }));
}
function deleteAccount(catchFunction){
  return deleteUser(auth.currentUser).then((res) => {
    console.log('User deleted.');
    return res
  }).catch(catchFunction||console.log)
}
function setNewEmail(newEmail,catchFunction){
  return updateEmail(auth.currentUser, newEmail).then((res) => {
    console.log('Email updated!'); 
    return res
  }).catch(catchFunction||console.log)
}
export {
  deleteAccount,
  addProfilePicURL_db_only,
  patchProfile,
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
  addProfilePic
};


import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { doc, setDoc, updateDoc , arrayUnion, getDoc} from "firebase/firestore"; 
import {dataBase} from './firebase' 

const userData = doc(dataBase, 'USER Data collection', 'USER DATA');

function addUserToFirestore(user){
    const {displayName,email,uid}=user
   return updateDoc(userData, {
        [uid]:{displayName,uid, email, dogsCaught:[],friends:[]}
    })
}
function getUserDatabyUID(uid){
    return getDoc(userData).then((res)=>{
        const data = res.data()[uid]
        return data
      })
}
function getUserData(){
    return getDoc(userData).then((res)=>{
        const data = res.data()
        return data
      })
}

function addFriend(friendId){
    const uid_friends = loggedInUser.uid+'.friends'
    updateDoc(userData, {
    [uid_friends]:  arrayUnion(friendId)
      
  }).then(res=>console.log({res}))
  .catch(error=>console.log({error,msg:'while adding friend'}))
}

function addCaughtDog(dogName){
    const uid_dogs = loggedInUser.uid+'.dogsCaught'
    updateDoc(userData, {
    [uid_dogs]:  arrayUnion(dogName)
      
  }).then(res=>console.log({res}))
  .catch(error=>console.log({error,msg:'while adding caught dog'}))
}
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
  
    firebase.auth().signInWithPopup(provider)
    .then((userCredential)=>{
      const {user}=userCredential
      addUserToFirestore(user)
      loggedInUser=user
        welcomeMessage(user)})
        .catch(error=>console.log({error}))
}
function emailLogin(email,password){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // loggedInUser=user
    // welcomeMessage(user)
    // ...
  })
  .catch(error=>console.log({error,msg:'while logging in with email'}))
}
function createEmailAndUser(email,password){
    createUserWithEmailAndPassword(auth, email,password)
  .then((userCredential) => {
   const user = userCredential.user;
    // welcomeMessage(user)
    addUserToFirestore(user)
    return user.uid
  }).then((uid)=>{
    return getUserDatabyUID(uid)
  }).then((user)=>{
    // loggedInUser=user 
  })
  .catch(error=>console.log({error,msg:'while creating user'}))
}

const signOut= ()=>{
    auth.signOut()
    .then(res=>{
       // welcome.innerHTML='logged out!'
       // loggedInUser={}
    })
    .catch(error=>console.log({error,msg:'while signing out'}))
}

// auth.onAuthStateChanged(user=>console.log(user))
export {signOut, createEmailAndUser, emailLogin, googleLogin, addCaughtDog,addFriend, getUserDatabyUID, addUserToFirestore, getUserData}
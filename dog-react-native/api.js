const database = firebase.firestore();

const collectionName = "USER Data collection";
const newDocName = "USER DATA";

const userData = database.collection(collectionName).doc(newDocName);

function addUserToFirestore(user) {
  const { displayName, email, uid } = user;
  return userData.update({
    [uid]: { displayName, uid, email, dogsCaught: [], friends: [] },
  });
}
function getUserDatabyUID(uid) {
  return userData.get().then((res) => {
    const data = res.data()[uid];
    return data;
  });
}

function addFriend(friendId) {
  const uid_friends = loggedInUser.uid + ".friends";
  userData
    .update({
      [uid_friends]: firebase.firestore.FieldValue.arrayUnion(friendId),
    })
    .then((res) => console.log({ res }))
    .catch((error) => console.log({ error, msg: "while adding friend" }));
}

function addCaughtDog(dogName) {
  const uid_dogs = loggedInUser.uid + ".dogsCaught";
  userData
    .update({
      [uid_dogs]: firebase.firestore.FieldValue.arrayUnion(dogName),
    })
    .then((res) => console.log({ res }))
    .catch((error) => console.log({ error, msg: "while adding caught dog" }));
}
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
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
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
function emailCreate(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
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

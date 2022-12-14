import {
  ImageEditor,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getUserDatabyUID, patchProfile, useLoggedInUser } from "../api";
import { auth } from "../firebase";
import UploadImage from "./uploadImage";
import ProfileInfo from "./ProfileInfo";
import { getDogImageUrls } from "../storage-api";

const ProfileScreen = () => {
  const [email, setEmail] = useState(auth.currentUser.email);
  const [name, setName] = useState(auth.currentUser.displayName || "Guest");
  const [user, setUser] = useState(auth.currentUser);
  const [edit, setEdit] = useState(false);
  const [dogObject, setDogObject] = useState({});
  const [dogsCaught, setDogsCaught] = useState([]);

  useEffect(() => {
    getUserDatabyUID(auth.currentUser.uid).then((loggedInUser) => {
      setUser(loggedInUser);
      const dogs=[]
      loggedInUser.imagePaths.forEach(path=>{
        const name = path.split('_')[0]
        if(!dogs.includes(name)) dogs.push(name)
      })
      const index = dogs.indexOf('')
      if (index > -1) { 
        dogs.splice(index, 1); 
      }
      setDogsCaught(dogs)
    });
    setName(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
  }, [edit]);
  // useEffect(()=>{ getDogImageUrls().then((res) => {
  //     setDogObject(res);
  //     const arr = Object.keys(res)
  //     const index = arr.indexOf('');
  //     if (index > -1) { 
  //       arr.splice(index, 1); 
  //     }
  //     setDogsCaught(arr)
  //   })},[])
  const handleEdit = () => {
    setEdit((x) => !x);
  };
  if (edit) {
    return <ProfileInfo edit={edit} setEdit={setEdit} />;
  }

  return (
    <View style={styles.container}>
      <UploadImage />
      <Text style={styles.input}>Name: {name} </Text>
      <Text style={styles.input}>Email: {email}</Text>
      <TouchableOpacity onPress={handleEdit} style={styles.button}>
        <Text style={styles.buttonText}> Edit Info</Text>
      </TouchableOpacity>
      <Text style={styles.dogCatch}>
        {" "}
        {"\n"}
        Dogs caught: {dogsCaught.length} / 50
      </Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderWidth: 10,
    borderColor: "#dc7646",
  },
  button: {
    backgroundColor: "#dc7646",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    fontWeight: "bold",
    fontSize: 23,
  },
  buttonText: {
    fontSize: 17,
  },
  dogCatch: {
    fontWeight: "bold",
    fontSize: 23,
  },
});

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

  useEffect(() => {
    getUserDatabyUID(auth.currentUser.uid).then((loggedInUser) => {
      setUser(loggedInUser);
    });
    setName(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    getDogImageUrls().then((res) => {
      setDogObject(res);
    });
  }, [edit]);

  const handleEdit = () => {
    setEdit((x) => !x);
  };
  if (edit) {
    return <ProfileInfo edit= {edit} setEdit={setEdit} />;
  }

  return (
    <View style={styles.container}>
      <UploadImage />
      <Text>Name: {name} </Text>
      <Text>Email: {email}</Text>
      <TouchableOpacity onPress={handleEdit} style={styles.button}>
        <Text style={styles.buttonText}> Edit Info</Text>
      </TouchableOpacity>
      <Text style={styles.dogCatch}>
        Dogs caught :{Object.keys(dogObject).length}/50
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
  },
  button: {
    backgroundColor: "#dc7646",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    fontSize: 23,
  },
});

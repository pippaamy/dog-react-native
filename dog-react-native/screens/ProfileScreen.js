import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { getUserDatabyUID, patchProfile, useLoggedInUser } from "../api";
import { auth } from "../firebase";
import UploadImage from "./uploadImage";

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("guest");

  // patchProfile()

  getUserDatabyUID(auth.currentUser.uid).then((loggedInUser) => {
    setUser(loggedInUser);
  });

  return (
    <View style={styles.container}>
      <UploadImage />
      <Text style={styles.name}> Name: {user.displayName}</Text>
      <Text style={styles.email}>Email: {user.email}</Text>
      <Text style={styles.dogCatch}>Dogs caught :{user.dogsCaught}/50</Text>
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
});

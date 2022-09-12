import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { getUserDatabyUID, useLoggedInUser } from "../api";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const [user, setUser] = useState({});

  getUserDatabyUID(auth.currentUser.uid).then((loggedInUser) => {
    setUser(loggedInUser);
  });

  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
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

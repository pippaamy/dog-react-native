import {
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

const ProfileScreen = () => {
  const [email, setEmail] = useState(auth.currentUser.email);
  const [name, setName] = useState(auth.currentUser.displayName || "Guest");
  const [password, setPassword] = useState(undefined);
  const [user, setUser] = useState(auth.currentUser);

  // patchProfile()
  //getDogImage URL - Object.keys -1
  useEffect(() => {
    getUserDatabyUID(auth.currentUser.uid).then((loggedInUser) => {
      setUser(loggedInUser);
    });
  }, []);

  return (
    <View style={styles.container}>
      <UploadImage />
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor="gray"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholderTextColor="gray"
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> Submit changes</Text>
      </TouchableOpacity>

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
  button: {
    backgroundColor: "#dc7646",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../api";

// import Navigation from "../Navigation";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
    <>
      <TouchableOpacity onPress={handleLogOut} style={styles.button}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

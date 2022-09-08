import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
// import Navigation from "../Navigation";

const HomeScreen = () => {
  const handleLogOut = () => {
    console.log("logging out");
    navigation.replace("LogIn");
  };

  return (
    <>
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("Home")}>Home</Text>
        {/* <Navigation /> */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity OnPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </View>
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

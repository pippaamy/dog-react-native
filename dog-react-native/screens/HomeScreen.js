import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

// import Navigation from "../Navigation";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogOut = () => {
    console.log("Im logging out");
    auth
      .signOut()
      .then(() => {
        navigation.replace("LogInScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("Home")}>Home</Text>
        {/* <Navigation /> */}
      </View>
      <View style={styles.button}>
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

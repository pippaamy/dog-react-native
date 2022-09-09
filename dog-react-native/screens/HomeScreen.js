import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
    <>
      <Text style={styles.mainText}>
        The pawsome app that allows you to collect dogs. Go for a walk, snap a
        dog picture and add it to your collection. There are 30 dogs to collect!
      </Text>
      <Text style={styles.warning}>
        Make sure you have permission to take a dog picture!
      </Text>
      <Image
        source={require("../autmndognew.gif")}
        style={{
          width: 320,
          height: 200,
          display: "flex",
          flexDirection: "row",
        }}
        resizeMode="contain"
        resizeMethod="resize"
        justifyContent="center"
        alignItems="center"
      />
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
    backgroundColor: "#dc7646",
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
  mainText: { color: "#a45c5c", fontWeight: "700", fontSize: 16, padding: 20 },
  warning: {
    color: "#b45c5c",
    fontWeight: "700",
    fontSize: 16,
    padding: 20,
    paddingBottom: 100,
  },
});

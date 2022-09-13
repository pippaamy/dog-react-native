import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../api";

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
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {"\n"}
          {"\n"}
          The pawsome app that allows you to collect dogs. Go for a walk, snap a
          dog picture and add it to your collection. Compare your collections
          with your friends. There are 30 dogs to collect! WOOF.
        </Text>
        <Text style={styles.warning}>
          Make sure you have permission to take a dog picture!
        </Text>
        <Text>{"\n"}</Text>
        <Image
          source={require("../public/assets/autmndognew.gif")}
          style={{
            width: 320,
            height: 200,
            display: "flex",
            flexDirection: "row",
            marginLeft: 55
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
      </View>
    </>
  );
};

export default HomeScreen;

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
    height: 100,
    padding: 15,
    paddingTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    zIndex: 1
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlignVertical: "center",
    
  },
  mainText: {
    padding: 10,
    paddingTop: 30,
    textAlign: "center",
    color: "#a45c5c",
    fontWeight: "700",
    fontSize: 18,
    paddingBottom: 20,
  },
  warning: {
    padding: 10,
    borderWidth: 2.4,
    borderColor: "red",
    borderRadius: 10,
    textAlign: "center",
    color: "#b45c5c",
    fontWeight: "bold",
    fontSize: 18,
  },
});

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  console.log("in loading screen");
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../public/assets/dograinbow.gif")}
          style={styles.rainbowImg}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <Text style={styles.title}>FETCHING YOUR DOG...</Text>
      </View>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  rainbowImg: {
    width: 420,
            height: 370,
            // display: "flex",
            // flexDirection: "row",
            marginRight: 15
  }
});

import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  console.log("in loading screen");
  return (
    <>
      <View style={StyleSheet.container}>
        <Text style={StyleSheet.title}>FETCHING YOUR DOG</Text>
      </View>
      <Image
        source={require("../dograinbow.gif")}
        style={{ width: 420, height: 350 }}
      />
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

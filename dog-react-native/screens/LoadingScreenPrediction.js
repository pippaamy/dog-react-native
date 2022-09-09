import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  console.log("in loading screen");
  return (
    <>
      <View style={StyleSheet.container}>
        <Image
          source={require("../dograinbow.gif")}
          style={{
            width: 400,
            height: 350,
            display: "flex",
            flexDirection: "row",
          }}
          resizeMode="contain"
          resizeMethod="resize"
          justifyContent="center"
          alignItems="center"
        />
        <Text style={StyleSheet.title}>FETCHING YOUR DOG...</Text>
      </View>
    </>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dc7646",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});

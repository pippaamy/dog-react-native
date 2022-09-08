import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  return (
    <>
      <Image
        source={require("../modelgiphy.gif")}
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

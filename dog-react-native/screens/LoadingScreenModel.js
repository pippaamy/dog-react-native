import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const LoadingScreenModel = () => {
  return (
    <>
      <Image
        source={require("../modelgiphy.gif")}
        style={{ width: 420, height: 350 }}
      />
    </>
  );
};

export default LoadingScreenModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

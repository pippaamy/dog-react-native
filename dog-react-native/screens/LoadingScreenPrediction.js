import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  return (
    <>
      <View style={StyleSheet.container}>
        <Text>COLLECTING YOUR DOG</Text>
      </View>
      <Image
        source={require("../doggiphy.gif")}
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

import React from "react";
import { StyleSheet, Text, View } from "react-native";

<iframe
  src="https://giphy.com/embed/ZE5aeSFHu5tWR7OeWl"
  width="380"
  height="480"
  frameBorder="0"
  class="giphy-embed"
  allowFullScreen
></iframe>;

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

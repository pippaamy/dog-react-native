import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Gallery</Text>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

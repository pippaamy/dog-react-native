import { StyleSheet, Text, View } from "react-native";
import React from "react";

const GalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Matched Dogs!</Text>
      <Text style={styles.mainText}>How many will you collect?</Text>
      <Text style={styles.titleText}>Unmatched Snaps</Text>
      <Text style={styles.mainText}>(Possibly not a dog)</Text>
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainText: {
    color: "#a45c5c",
    fontWeight: "700",
    fontSize: 16,
    padding: 20,
  },
  titleText: {
    color: "#a45c5c",
    fontWeight: "900",
    fontSize: 24,
    padding: 20,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FriendsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

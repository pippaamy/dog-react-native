import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import Navigation from "../Navigation";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Home")}>Home</Text>
      {/* <Navigation /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

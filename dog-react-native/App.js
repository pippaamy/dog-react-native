import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./screens/LogInScreen";
import MainScreen from "./screens/MainScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LogInScreen}
        />
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Gone For A Bork!' }} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Test" component={TestScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "./screens/LogInScreen";
import MainScreen from "./screens/MainScreen";
import CameraScreen from "./screens/CameraScreen";

const Stack = createNativeStackNavigator();

const headerOptions = {
  title: 'Gone For A Bork!',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#c79e58',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  }
}

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={headerOptions} 
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            headerStyle: {
              backgroundColor: '#c79e58',
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
          
  );
}

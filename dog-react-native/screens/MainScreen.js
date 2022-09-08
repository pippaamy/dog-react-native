import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import CameraScreen from "./CameraScreen";

const Tab = createBottomTabNavigator();


export default function MainScreen() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
      </Tab.Navigator>
    );
  }
import { StyleSheet, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreenNav";
import GalleryScreen from "./screens/GalleryScreen";
import Icon from "react-native-ionicons";

const homeName = "Home";
const cameraName = "Camera";
const galleryName = "Gallery";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === cameraName) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn === galleryName) {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={cameraName} component={CameraScreen} />
      <Tab.Screen name={galleryName} component={GalleryScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});

import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import GalleryScreen from "./GalleryScreen";
import FriendsScreen from "./FriendsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const navigation = useNavigation();

  const headerOptions = {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <Text style={styles.cameraButton}>Camera</Text>
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: "#c79e58",
    },
    headerTintColor: "#fff",
    headerTitleAlign: "center",
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...headerOptions,
          tabBarIcon: () => (
            <View style={styles.tabView}>
              <Image
                source={require("../public/assets/icons/home-light.png")}
                resizeMode="contain"
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>HOME</Text>
            </View>
          ),
        }} 
       />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          ...headerOptions,
          tabBarIcon: () => (
            <View style={styles.tabView}>
              <Image 
                source={require('../public/assets/icons/profile-light.png')}
                resizeMode='contain'
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>PROFILE</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          ...headerOptions,
          tabBarIcon: () => (
            <View style={styles.tabView}>
              <Image
                source={require("../public/assets/icons/gallery-light.png")}
                resizeMode="contain"
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>GALLERY</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          ...headerOptions,
          tabBarIcon: () => (
            <View style={styles.tabView}>
              <Image
                source={require("../public/assets/icons/friends-light.png")}
                resizeMode="contain"
                style={styles.tabImage}
              />
              <Text style={styles.tabText}>FRIENDS</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: "#7a4815", 
    color: "#fff", 
    fontSize: 20, 
    marginRight: 10,
    padding: 5,
  },
  tabBar: {
    backgroundColor: "#c79e58",
    display: "flex",
    height: 80,
  },
  tabView: {
    alignItems: "center",
    backgroundColor: "#c79e58",
    height: 70,
    justifyContent: "center",
    width: 90,
  },
  tabImage: {
    width: 40,
    height: 40,
  },
  tabText: {
    color: "#fff",
    fontSize: 20,
  },
});

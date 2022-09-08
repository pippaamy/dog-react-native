import React from "react";
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import GalleryScreen from "./GalleryScreen";
import FriendsScreen from "./FriendsScreen";

const Tab = createBottomTabNavigator();


export default function MainScreen() {
    
    const navigation = useNavigation();
    
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ 
            title: 'Welcome',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Camera')}
                title="Camera"
                color="#312280"
              />
            ),
          }}  />
        <Tab.Screen name="Gallery" component={GalleryScreen} options={{ 
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Camera')}
                title="Camera"
                color="#312280"
              />
            ),
          }}  />
        <Tab.Screen name="Friends" component={FriendsScreen} options={{ 
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Camera')}
                title="Camera"
                color="#312280"
              />
            ),
          }}  />
      </Tab.Navigator>
    );
  }
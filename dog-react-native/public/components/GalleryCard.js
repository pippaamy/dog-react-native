import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Breeds from '../breeds.js'


const GalleryCard = () => {

    return (
        <View>
          <Text>{Breeds.breeds[0].breed}</Text>
        </View>
      )

}

export default GalleryCard; 
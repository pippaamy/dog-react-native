import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Breeds from '../breeds.js'


const GalleryCard = ({breed}) => {

    return (
        <View>
          <Text>{breed}</Text>
        </View>
      )

}

export default GalleryCard; 
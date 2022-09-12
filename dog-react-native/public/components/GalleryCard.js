import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const GalleryCard = ({breed}) => {

    return (
        <View style={styles.item}>
          <Text>{breed}</Text>
        </View>
      )

}

export default GalleryCard; 

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        flex: 1,
        height: 100,
        justifyContent: "center",
        minWidth: 100,
        maxWidth: 120,
        padding: 10
    }
  });
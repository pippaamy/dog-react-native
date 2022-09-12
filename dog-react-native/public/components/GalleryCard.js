import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const GalleryCard = ({breed}) => {

    return (
        <View style={styles.item}>
          <Text style={styles.itemText}>{breed}</Text>
        </View>
      )

}

export default GalleryCard; 

const styles = StyleSheet.create({
    item: {
        alignItems: "center",
        backgroundColor: "#dc7646",
        borderColor: "#7a4815",
        borderRadius: 5,
        borderWidth: 3,
        flex: 1,
        height: 150,
        justifyContent: "center",
        margin: 10,
        maxWidth: 100,
        minWidth: 100,
        padding: 10
    },
    itemText: {
        color: "#fff",
        fontWeight: 'bold',
    }
  });
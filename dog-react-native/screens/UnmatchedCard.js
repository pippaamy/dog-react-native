import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteImage } from '../storage-api.js';


const GalleryCard = ({ image }) => {
  
  const [isDeleted, setIsDeleted] = useState({});


  return (
    <Text style={styles.titleText}>This Is Possibly Not A Dog</Text>
  )

}

export default GalleryCard;

const styles = StyleSheet.create({
  mainText: { 
    color: "#a45c5c", 
    fontSize: 16, 
  },
  photo: {
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    height: 150,
    margin: 10,
    width: 100, 
  },
  titleText: { 
    color: "#a45c5c", 
    fontWeight: "900", 
    fontSize: 24, 
  }
});
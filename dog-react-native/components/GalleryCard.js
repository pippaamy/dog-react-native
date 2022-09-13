import React, { useEffect,useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDogImageUrls } from '../storage-api.js';


const GalleryCard = ({ breed }) => {
    const [userPhotosObj, setUserPhotosObj] = useState({});

    useEffect(()=>{
        getDogImageUrls().then((obj)=>{
          setUserPhotosObj(obj)
        })
    },[])


    if (userPhotosObj.hasOwnProperty(breed)) {
        const dogUrl = userPhotosObj[breed][0];
        return (
          <Image
            source={{uri: dogUrl}}  
            style={styles.photo}
          />
        )
      } else {
        return (
          <ImageBackground 
            resizeMode="contain" 
            source = {require("../public/assets/mystery-dog.jpg")} 
            style={styles.mystery}    
          />
        )
      }

}

export default GalleryCard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7a4815", 
    color: "#fff", 
    fontSize: 20, 
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    width: 82
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: "#f6d186",
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  list: {
    marginHorizontal: "auto",
    width: 360,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainText: { 
    color: "#a45c5c", 
    fontSize: 16, 
  },
  mystery: {
    alignItems: "center",
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    flex: 1,
    height: 150,
    justifyContent: "center",
    margin: 10,
    maxWidth: 100,
    minWidth: 100,
  },
  photo: {
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    height: 150,
    margin: 10,
    width: 100, 
  },
  subtitleText: { 
    color: "#a45c5c", 
    fontWeight: "700", 
    fontSize: 16, 
  },
  titleText: { 
    color: "#a45c5c", 
    fontWeight: "900", 
    fontSize: 24, 
  }
});
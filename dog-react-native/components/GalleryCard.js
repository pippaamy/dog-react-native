import React, { useEffect,useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteImage, getDogImageUrls } from "../storage-api.js";


const GalleryCard = ({ breed, isMatch, photoUrl }) => {
  const [userPhotosObj, setUserPhotosObj] = useState({});

  useEffect(()=>{
        getDogImageUrls().then((obj)=>{
          setUserPhotosObj(obj)
        })
  },[])

  // const handleDelete = (photoUrl) => {
  //   deleteImage(photoUrl)
  // }


  if (isMatch && userPhotosObj.hasOwnProperty(breed)) {
    const dogUrl = userPhotosObj[breed][0];
    return (
      <ImageBackground
        resizeMethod="auto"   
        source={{uri: dogUrl}}  
        style={styles.photoMatched}
      >
        {/* <View style={styles.overPic}>
          <TouchableOpacity onPress={loadDogCard(breed)} style={styles.press}/>
        </View> */}
      </ImageBackground>
    )
  } else if (!isMatch) {
    console.log(photoUrl)
    return (
      <View style={styles.listUnmatched}>
        <Image
          resizeMode="stretch" 
          source={{uri: photoUrl}}
          style={styles.photo}
        />
      <TouchableOpacity 
        // onPress={handleDelete(photoUrl)}
      >
        <Text style={styles.delete}>Delete?</Text>
      </TouchableOpacity>
      </View>
      
    )
  } else {
    return (
      <Image 
        resizeMode="center" 
        source={require("../public/assets/mystery-dog.jpg")} 
        style={styles.photo}    
      />
    )
  }

}

export default GalleryCard;

const styles = StyleSheet.create({
  delete: {
    fontSize: 15,
    marginLeft: 10,
  },  
  fullView: {
    borderColor: "#7a4815",
    borderRadius: 5,
    borderWidth: 3,
    height: 450,
    margin: 10,
    width: 300, 
  },
  icon: {
    height: 20,
    width: 20
  },
  iconContain: {
    justifyContent: 'center',
    backgroundColor: "black",
    height: 30,
    width: 25
  },
  listUnmatched: {
    flexDirection: "column",
    height: 170,
    marginBottom: 20,
  },
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
    marginBottom: 0,
    width: 100, 
  },
  photoMatched: {
    height: 150,
    margin: 10,
    width: 100, 
  },
  overPic: {
    alignItems: 'stretch',
    bottom: 0, 
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,   
  }, 
  press: {
    flex: 1,
  },
});
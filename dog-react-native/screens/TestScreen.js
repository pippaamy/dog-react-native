import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firebaseApp } from "../firebase";
import { getImageUrl, imageRef, uploadImage, userUploadImage } from "../storage-api";
import { uploadBytes } from "firebase/storage";
import MobilenetScreen from "./MobilenetTestScreen";
import { addImagePath } from "../api";

const TestScreen = () => {
  const[image,setImage] = useState('')
 const FR = new FileReader
  function onFileChange(event){
    const file=event.target.files[0]
    userUploadImage(file)
  }
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    }
  });

  useEffect(()=>{
  getImageUrl('image').then(url=>{
    console.log(url);
    setImage(<img src = {url}></img>)
  })
},[])
  return (
    <View>
      <Text>Test Screen
       
      </Text>
      <input type ="file" onChange={onFileChange}></input>
      {/* <MobilenetScreen/> */}
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
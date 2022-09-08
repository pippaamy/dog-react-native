import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { firebaseApp } from "../firebase";
import { imageRef } from "../storage-api";
import { uploadBytes } from "firebase/storage";
import MobilenetScreen from "./MobilenetTestScreen";
import Eeviepom from "../Eeviepom.jpg"

const TestScreen = () => {
  
 const FR = new FileReader
  function onFileChange(event){
    const file=event.target.files[0]
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
    }).catch((error)=>console.log({error}))
   const img = <img src={Eeviepom} alt="eevie" />
   console.log(img);
  
  }
  return (
    <View>
      <Text>Test Screen</Text>
      <input type ="file" onChange={onFileChange}></input>
      {/* <MobilenetScreen/> */}
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
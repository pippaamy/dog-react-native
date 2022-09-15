import React, { useState, useRef } from 'react';
import { Button, Image, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Prediction from './Prediction';
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isHidden, setisHidden] = useState(true)
  const [error, setError] = useState(false)
  const ref = useRef(null);
  const navigation = useNavigation();
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const _takePhoto = async () => {
    const photo = await ref.current.takePictureAsync()
    setPreviewVisible(true)
    setCapturedImage(photo.uri)
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const handlePress = () => {
    setisHidden(false)
  }

  let PhotoPreview = null;

  if (previewVisible && capturedImage) {
    PhotoPreview = () => (
      <View style={{flex: 1}}>
        <Image
          source = {{ uri: capturedImage }}
          style={{flex: 9}}
        />
        <View
          style={{
            backgroundColor: '#C79E58',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            minHeight: 60,
          }}>
          <TouchableOpacity onPress={__retakePicture}>
            <Text style={{backgroundColor: "#7a4815", color: "#fff", fontSize: 20, padding: 5 }}>Retake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}>            
            <Text style={{backgroundColor: "#7a4815", color: "#fff", fontSize: 20, padding: 5, marginLeft:30 }}>Match Dog!</Text>          
          </TouchableOpacity>
         </View>
      </View>
    )
  }
  if(error){
    setTimeout(() => {
      navigation.replace("Main");
    }, 2000)
    return (
      <View>
        <Camera>
           <View
           style={{
            flex: 1, 
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            alignItems: 'center',
            justifyContent: 'center', 
            backgroundColor: 'red'
        }}>
            <Text style={{backgroundColor: 'white'}}>
              something went wrong
            </Text>
           </View>
        </Camera>
      </View>
    )
    
  }
  return (
    <>
    {isHidden ? <View style={{ flex: 1 }}>
      {previewVisible && capturedImage ? 
      (
        <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
        >
        <PhotoPreview />
        </View>
      ) : (
        <Camera
        onMountError={(err) => setError(true)}
        style={{flex: 1,width:"100%"}}
        ref = {ref}
        >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between'
          }}
          >
          <View
            style={{
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center'
            }}
            >
            <TouchableOpacity
              onPress={_takePhoto}
              style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff'
              }}
              />
          </View>
        </View>
      </Camera>
      )} 

    </View> : <Prediction capturedImage={capturedImage} navigation={navigation}/>}
    
      </>
  );
}

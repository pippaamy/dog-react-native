import React, { useState, useEffect, useRef } from "react";
import { Button, Image, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import LoadingScreen from "./LoadingScreenPrediction";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const ref = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const _takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo.uri);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  let PhotoPreview = null;

  if (previewVisible && capturedImage) {
    PhotoPreview = () => (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: capturedImage }} style={{ flex: 9 }} />
        <View
          style={{
            alignSelf: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            minHeight: 60,
          }}
        >
          <TouchableOpacity onPress={__retakePicture}>
            <Text style={{ fontSize: 20, marginLeft: 30 }}>Retake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={__matchDog}
          >
            <Text style={{ fontSize: 20, marginLeft: 30 }}>Match Dog!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {previewVisible && capturedImage ? (
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <PhotoPreview />
        </View>
      ) : (
        <Camera style={{ flex: 1, width: "100%" }} ref={ref}>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={_takePhoto}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>
        </Camera>
      )}
    </View>
  );
}

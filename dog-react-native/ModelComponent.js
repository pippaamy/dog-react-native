import React, { useState, useEffect }  from 'react';
import { StyleSheet, View,Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Svg, {Rect} from 'react-native-svg';
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from './public/model/Eevie.jpg'
import * as tfn from "@tensorflow/tfjs-node"

export default ModelComponent = () => {

    const [imageLink,setImageLink] = useState(jpeg)
    const [isEnabled,setIsEnabled] = useState(true)
    const [predictions,setPredictions]=useState([])
    const [dogModel,setDogModel]=useState("")

    useEffect(() => {
        async function loadModel(){
          console.log("[+] Application started")
          //Wait for tensorflow module to be ready
          const tfReady = await tf.ready();
          console.log("[+] Loading custom model")
          //Replce model.json and group1-shard.bin with your own custom model
          const modelJson = await require("./public/model/model.json");
          const modelWeight = await require("/Users/Roisin/northcoders/projects/dog-react-native/dog-react-native/public/model/weights.bin");
          const dogCustomModel = await tf.loadLayersModel(bundleResourceIO(modelJson,modelWeight));
          //Assign model to variable
          setDogModel(dogCustomModel)
          console.log("[+] Model Loaded")
        }
        loadModel()
      }, []); 

    //   function imageToTensor(rawImageData){
    //     //Function to convert jpeg image to tensors
    //     const TO_UINT8ARRAY = true;
    //     const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    //     // Drop the alpha channel info for mobilenet
    //     const buffer = new Uint8Array(width * height * 3);
    //     let offset = 0; // offset into original data
    //     for (let i = 0; i < buffer.length; i += 3) {
    //       buffer[i] = data[offset];
    //       buffer[i + 1] = data[offset + 1];
    //       buffer[i + 2] = data[offset + 2];
    //       offset += 4;
    //     }
    //     return tf.tensor3d(buffer, [height, width, 3]);
    //   }



tf.tidy(() => {
  const imageTensor = tf.node.decodeImage(imageLink)
  console.log(`Success: local file to a ${imageTensor.shape} tensor`)

  const imageBWTensor = tf.node.decodeImage(imageLink)
  console.log(`Success: local file to a ${imageBWTensor.shape} tensor`)
})

const getDogBreeds = async() => {

    let result = await dogModel.predict(imageTensor).data()
    console.log(result)
}
}
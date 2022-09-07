import React, { useState, useEffect }  from 'react';
import { StyleSheet, View,Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Svg, {Rect} from 'react-native-svg';
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from './public/model/Eevie.jpg'

export default ModelComponent = () => {

    ///////// pls do not pull down this component it isnt working :(

    file_path = "/Users/Roisin/northcoders/projects/dog-react-native/dog-react-native/public/model/Eevie.jpg"
    img = tf.io.read_file(file_path)
    ///// I don't know if read_file works on the string of the file path or the actual image but neither is working its saying tf.io.read_file is undefined

    const [imageLink,setImageLink] = useState(img)
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

      ////// as far as i know ^^^ this function is working to load the model

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



// tf.tidy(() => {
//   const imageTensor = tf.io.decodeImage(imageLink)
//   console.log(`Success: local file to a ${imageTensor.shape} tensor`)

//   const imageBWTensor = tf.io.decodeImage(imageLink)
//   console.log(`Success: local file to a ${imageBWTensor.shape} tensor`)
// })
/// ^^^ this didn't work i dont know why

tensor = tf.io.decode_image(img, channels=3, dtype=tf.dtypes.float32)
tensor = tf.image.resizeBilinear(tensor, [224, 224])

inputTensor = tf.expand_dims(tensor, axis=0)

/////this is where I'm trying to convert the image into the tensor but nothing works

const getDogBreeds = async() => {

    let result = await dogModel.predict(inputTensor).data()
    ////this is the only line of code we need to get predictions but currently theres no tensors being fed into it
    console.log(result)
}
}
import React from "react";
import {
  StyleSheet,
  Text
} from "react-native";
import * as tf from "@tensorflow/tfjs";

import * as FileSystem from 'expo-file-system';
import {decodeJpeg, fetch} from '@tensorflow/tfjs-react-native'; // comment out this line for wsl
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as jpeg from "jpeg-js";
import LoadingScreen from "./LoadingScreenPrediction";
import { PredictedDog } from "./PredictedDog";

class Prediction extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: this.props.capturedImage || null,
    hasRendered: false
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true,
    });
    this.model = await mobilenet.load();
    this.setState({ isModelReady: true });
    this.setState({hasRendered: true})
    console.log(this.props.capturedImage);
  }
  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  }

  classifyImage = async (image) => {
    // console.log(image, "image")
    try {
      // const imageAssetPath = Image.resolveAssetSource(this.state.image)
      const response = await fetch(image, {}, { isBinary: true });
      // console.log(response, "response")
      const rawImageData = await response.arrayBuffer();
      const imageTensor = this.imageToTensor(rawImageData);
      console.log(imageTensor, "imagetensor");
      const predictions = await this.model.classify(imageTensor);
      this.setState({ predictions });
      console.log(predictions, "predictions");
    } catch (error) {
      console.log(error);
    }
  };
  /* // DONT REMOVE!!  Replace the above function with this one for wsl
  classifyImage = async (image) => {
    try {
        const imageId= document.getElementById('imageId')
        console.log(imageId);
      const imageTensor = tf.browser.fromPixels( imageId)
      const predictions = await this.model.classify(imageTensor)
      this.setState({ predictions:predictions })
      console.log({predictions})
    } catch (error) { console.log(error)    } 
  } */


    /* // DONT REMOVE!!  Replace the above function with this one for wsl
  classifyImage = async (image) => {
    try {
        const imageId= document.getElementById('imageId')
        console.log(imageId);
      const imageTensor = tf.browser.fromPixels( imageId)
      const predictions = await this.model.classify(imageTensor)
      this.setState({ predictions:predictions })
      console.log({predictions})
    } catch (error) { console.log(error)    } 
  } */

  renderPrediction = (prediction) => {
    const hasRendered = this.state
    if (this.hasRendered) {
      this.setState({
        hasRendered: false,
      });
      console.log(prediction, "djknsjcsnk");
      return (
        <Text key={prediction.className} style={styles.text}>
        {prediction.className}
      </Text>
    );
  }
  };
  
  render() {
    const { isTfReady, isModelReady, predictions, image, hasRendered } = this.state;
    if (isTfReady && isModelReady && image && hasRendered === false) {
      this.classifyImage(image);
    }

    if (predictions !== null) {
      return (<>
        <PredictedDog image={image} predictions={predictions}/>
        {/* //uncomment the line below for wsl */}
        {/* <img src={image} id='imageId' hidden/>  */}
      </>);
    }
    return (
      <>
        <LoadingScreen />
        {/* //uncomment the line below for wsl */}
        {/* <img src={image} id='imageId' hidden/>  */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171f24",
    alignItems: "center",
  },
  loadingContainer: {
    marginTop: 80,
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  loadingModelContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  imageWrapper: {
    width: 280,
    height: 280,
    padding: 10,
    borderColor: "#cf667f",
    borderWidth: 5,
    borderStyle: "dashed",
    marginTop: 40,
    marginBottom: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 250,
    height: 250,
    position: "absolute",
    top: 10,
    left: 10,
    bottom: 10,
    right: 10,
  },
  predictionWrapper: {
    height: 100,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  transparentText: {
    color: "#ffffff",
    opacity: 0.7,
  },
  footer: {
    marginTop: 40,
  },
  poweredBy: {
    fontSize: 20,
    color: "#e69e34",
    marginBottom: 6,
  },
  tfLogo: {
    width: 125,
    height: 70,
  },
});

export default Prediction;

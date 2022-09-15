import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { uploadImageFromUri, userUploadImage } from "../storage-api";
import { StyleSheet } from "react-native";
import { DogCard } from "./DogCard";
import { useState } from "react";
const dogs = require("../public/breeds-50-lower - breeds.json");

export const PredictedDog = ({ image, predictions }) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);




    let formattedPredictions = []
    const format = () => {
        predictions.forEach((prediction) => {
            for(let i=0; i<Object.keys(dogs).length; i++) {
                if (prediction.className.toLowerCase().includes(dogs[i].nameLower) && prediction.probability > 0.2) {
                    formattedPredictions.push(dogs[i].breed, prediction.probability)
                }
            }
        })
    }
    
  format();
  const navigation = useNavigation();
  const handleNo = () => {
    navigation.replace("Camera");
  };
  const saveUnmatched = (event) => {
    event.defaultPrevented = true;
    if (event.currentTarget.disabled === true) {}
    else{
      event.currentTarget.disabled = true;
      setIsLoading(false);
      const id = `__${Date.now().toString()}`;
      uploadImageFromUri(image, id)
        .then(() => {
          setTimeout(() => {
            setIsLoading(true);
          }, 2000);
        })
        .catch(() => {
          console.log("caught at posting img");
          navigation.replace("Main");
        });
    }
  };

  const handleYes = async () => {
    // uploadImageFromUri(image,predictions[0].className+`_${Date.now().toString()}`)
    await uploadImageFromUri(image,formattedPredictions[0]+`_${Date.now().toString()}`)
    setClicked(true);
  };

  if (clicked) {
    return (
      <DogCard image={image} formattedPredictions={formattedPredictions} />
    );
  }

  if (formattedPredictions.length !== 0) {
    return (
      <>
        <View style={style.container}>
          <Image style={style.image} source={{ uri: image }} />
          <Text style={style.mainText}>
            There is a {(formattedPredictions[1] * 100).toFixed(1)}% chance that
            dog is a {formattedPredictions[0]}!
          </Text>
          <Text style={style.confirmText}>Is that right?</Text>
          <Text>
            {isLoading ? (
              <></>
            ) : (
              <Text style={style.confirmText}>saving....</Text>
            )}
          </Text>
          <View style={style.buttonWrapper}>
            <TouchableOpacity style={style.button} onPress={handleYes}>
              <Text style={style.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={handleNo}>
              <Text style={style.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={saveUnmatched}>
              <Text style={style.buttonText}>Save Anyway</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
  if (formattedPredictions.length === 0) {
    return (
      <>
        <View style={style.container}>
          <Image style={style.image} source={{ uri: image }} />
          <Text style={style.errorText}>
            We're not sure that is a dog! Try again or save your photo for later
          </Text>
          <Text>
            {isLoading ? (
              <></>
            ) : (
              <Text style={style.confirmText}>saving....</Text>
            )}
          </Text>
          <View style={style.buttonWrapper}>
            <TouchableOpacity style={style.errorButton} onPress={handleNo}>
              <Text style={style.errorButtonText}>Try again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.errorButton} onPress={saveUnmatched}>
              <Text style={style.errorButtonText}>Save Anyway</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
};

const style = StyleSheet.create({
  button: {
    backgroundColor: "#dc7646",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    margin: 10,
  },
  confirmText: {
    fontSize: 22,
  },
  mainText: {
    fontSize: 30,
    // fontWeight: 500
  },
  errorText: {
    fontSize: 30,
    alignItems: "center",
    marginLeft: 23,
    marginRight: 23,
    marginTop: 10,
    marginBottom: 10,
  },
  errorButton: {
    backgroundColor: "#dc7646",
    width: "40%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  errorButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});

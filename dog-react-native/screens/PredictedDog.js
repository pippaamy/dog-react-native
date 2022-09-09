import { View, Text, Image } from "react-native"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { uploadImageFromUri, userUploadImage } from "../storage-api"
import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"

export const PredictedDog = ({image, predictions}) => {
    const navigation = useNavigation();
    const handleNo = () => {
        navigation.replace("Camera");
       }


       const handleYes = (image, predictions) => {
        uploadImageFromUri(image, predictions)
       }

    return (
        <>
        <View style={style.container}>
        <Image style={style.image} 
        source={{uri: image}}/>
            <Text style={style.mainText}>
                There is a {(predictions[0].probability * 100).toFixed(1)}% chance that dog is a {predictions[0].className}!
            </Text>
            <Text style={style.confirmText}>
                Is that right?
            </Text>
            <View style={style.buttonWrapper}>

            <TouchableOpacity 
            style={style.button}
            onPress={handleYes}>
                <Text style={style.buttonText}>
                    Yes
                </Text>
                </TouchableOpacity> 
                <TouchableOpacity 
            style={style.button}
            onPress={handleNo}>
                <Text style={style.buttonText}>
                    No
                </Text>
                </TouchableOpacity> 
                </View>
        </View>
        </>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: "#dc7646",
        width: "30%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        margin: 10
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
        flexDirection: "row"
      },
      image: {
        width: 300,
        height: 300,
        borderRadius: 15,
        margin: 10
      },
      confirmText: {
        fontSize: 22
      },
      mainText: {
        fontSize: 30,
        // fontWeight: 500
      }
})
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native";
import { uploadImageFromUri } from '../storage-api';

export const PredictedDog = ({image, predictions}) => {
    const navigation = useNavigation();
    const handleNo = () => {
        navigation.replace("Camera");
    }


    const handleYes = (image) => {

    }

    const saveUnmatched = () => {    
        console.log(image)    
        const id = Date.now().toString()    
        console.log(id)    
        uploadImageFromUri(image, "carlieTest4")
      }

    return (
        <>
        <View>
            <Text>
                There is a {(predictions[0].probability * 100).toFixed(1)}% chance that is a {predictions[0].className}!
            </Text>
            <Text>
                Is that right?
            </Text>
            <Button>Yes, collect badge</Button>
            <Button onPress={handleNo}>No, retake</Button>
            <TouchableOpacity onPress={saveUnmatched}>
                <Text style={{backgroundColor: "#7a4815", color: "#fff", fontSize: 20, padding: 5, width:135 }}>Save Anyway</Text>
            </TouchableOpacity>
        </View>
        <View>
        <Image style={{width: 400, height: 400}} source={{uri: image}}/>
        </View>
        </>
    )
}
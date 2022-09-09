import { View, Text, Image } from "react-native"
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

export const PredictedDog = ({image, predictions}) => {
    const navigation = useNavigation();
    const handleNo = () => {
        navigation.replace("Camera");
       }


       const handleYes = (image) => {

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
            <Button>Yes</Button>
            <Button onPress={handleNo}>No</Button>
        </View>
        <View>
        <Image style={{width: 400, height: 400}} source={{uri: image}}/>
        </View>
        </>
    )
}
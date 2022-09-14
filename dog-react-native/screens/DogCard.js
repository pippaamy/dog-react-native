const dogs = require("../public/breeds-50-lower - breeds.json")
import { View, Text, Image, TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import * as energyIcon from "../public/images/bw-icons/006-thunder.png"

export const DogCard = ({image, formattedPredictions}) => {
    let breedInfo = []

  const getInfo = async () => {

     await dogs.forEach((dog) => {
          if (dog.breed === formattedPredictions[0]){
              breedInfo.push(dog)
            }
        })
    } 
    getInfo()

    return (
        <View style={style.container}>
            <Text style={style.breedTitle}>
                {formattedPredictions[0]}
            </Text>
            <Text style={style.subtitle}>
            {breedInfo[0].breed_group}
            </Text>
            <View style={style.imageWrapper}>
            <Image style={style.image} 
        source={{uri: image}}/>
                </View>
                <Image source={energyIcon}/>
                <View style={style.infoTextWrapper}>
        <Text style={style.infoText}>
        Energy Level: {"⚡".repeat(breedInfo[0].e1_energy_level)}
        {"\n"}
        Playfulness: {"🎾".repeat(breedInfo[0].e4_potential_for_playfulness)}
        {"\n"}
        Grooming Needs: {"🎀".repeat(breedInfo[0].c3_easy_to_groom)}
        {"\n"}
        Drooling Potential: {"💧".repeat(breedInfo[0].c2_drooling_potential)}
        {"\n"}
        Weight: {breedInfo[0].weight}
        {"\n"}
        Height: {breedInfo[0].height}
        {"\n"}
        Lifespan: {breedInfo[0].life_span}
        </Text>
                </View>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        borderRadius: 15,
        margin: 10
      },
      breedTitle: {
        fontSize: 30,
        fontWeight: "600"
      },
      container: {
        flex: 1,
        backgroundColor: "#f6d186",
        alignItems: "center",
        justifyContent: "center",
      },
      imageWrapper: {
        padding: 10,
        paddingBottom: 40,
        borderRadius: 15,
        backgroundColor: "#e8e8e3"
      },
      infoText: {
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center"

      },
      infoTextWrapper: {
        marginTop: 20
      },
      subtitle: {
        fontWeight: "500",
        fontSize: 20,
        marginBottom: 15
      }
})
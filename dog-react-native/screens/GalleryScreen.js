import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';
import Breeds from '../public/breeds.js';
import Common from '../public/common.js';
import GalleryCard from "../public/components/GalleryCard.js";


const GalleryScreen = () => {
  const [allCardsLoaded, setAllCardsLoaded] = useState(false);
  const [unmatchedLoaded, setUnmatchedLoaded] = useState(false);
  
  const GalleryNine = () => (
    <View style={styles.list}>
      {Breeds.breeds.map((dog)=>{
        if (Common.common.indexOf(dog.breed) !== -1) {
          return (
            <GalleryCard 
              key = {dog.breed}
              breed={dog.breed}
            />
          )
        }
      })}
    </View>
  )

  const GalleryPlus = () => (
    <View style={styles.list}>
      {Breeds.breeds.map((dog)=>{
        return (
          <GalleryCard 
            key = {dog.breed}
            breed={dog.breed}
          />
        )
    })}
    </View>
  )

  const GalleryUnmatched = () => (
    <View>
      <Text>Unmatched photos</Text>
    </View>
  )

  const loadAllCards = () => {
    setAllCardsLoaded(true)
  }

  const hideAllCards = () => {
    setAllCardsLoaded(false)
  }

  const loadUnmatched = () => {
    setUnmatchedLoaded(true)
  }

  const hideUnmatched = () => {
    setUnmatchedLoaded(false)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.titleText}>Matched Dogs!</Text>
      <Text style={styles.mainText}>How many will you collect?</Text>
      <GalleryNine />
      {!allCardsLoaded? (
        <TouchableOpacity onPress={loadAllCards}>
          <Text style={styles.button}>View All</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={hideAllCards}>
          <Text style={styles.button}>Hide All</Text>
        </TouchableOpacity>
      )}
      {allCardsLoaded? (
        <>
        <GalleryPlus />
        <TouchableOpacity onPress={hideAllCards}>
          <Text style={styles.button}>Hide All</Text>
        </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
      <Text style={styles.titleText}>Unmatched Snaps</Text>
      <Text style={styles.mainText}>(Possibly not a dog)</Text>
      {!unmatchedLoaded? (
        <TouchableOpacity onPress={loadUnmatched}>
          <Text style={styles.button}>View All</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={hideUnmatched}>
          <Text style={styles.button}>Hide All</Text>
        </TouchableOpacity>
      )}
      {unmatchedLoaded? (
        <>
        <GalleryUnmatched />
        <TouchableOpacity onPress={hideUnmatched}>
          <Text style={styles.button}>Hide All</Text>
        </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
      </ScrollView>
    </SafeAreaView>

      

  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7a4815", 
    color: "#fff", 
    fontSize: 20, 
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
    width: 83
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: "#f6d186",
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  list: {
    marginHorizontal: "auto",
    width: 360,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  mainText: { 
    color: "#a45c5c", 
    fontWeight: "700", 
    fontSize: 16, 
  },
  titleText: { 
    color: "#a45c5c", 
    fontWeight: "900", 
    fontSize: 24, 
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';
import Breeds from '../public/breeds.js';
import Common from '../public/common.js';
import GalleryCard from "../public/components/GalleryCard.js";


const GalleryScreen = () => {
  const [allCardsLoaded, setAllCardsLoaded] = useState(false);
  const [unmatchedLoaded, setUnmatchedLoaded] = useState(false);
  
  const GalleryNine = () => (
    //console.log(Common.common)
    Breeds.breeds.map((dog)=>{
      if (Common.common.indexOf(dog.breed) !== -1) {
        return (
          <GalleryCard 
            key = {dog.breed}
            breed={dog.breed}
          />
        )
      }
    })
  )

  const GalleryPlus = () => (
    Breeds.breeds.map((dog)=>{
      return (
        <GalleryCard 
          key = {dog.breed}
          breed={dog.breed}
        />
      )
    })
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
    <View style={styles.container}>
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
    </View>
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
    padding: 5
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: "#f6d186",
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  gallery: {

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

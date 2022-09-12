import React, { useEffect,useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Breeds from '../public/breeds.js';
import Common from '../public/common.js';
import GalleryCard from "../public/components/GalleryCard.js";
import {auth} from "../firebase.js"
import { getAllImageURLsByUser } from '../storage-api.js';


const GalleryScreen = () => {
  const [allCardsLoaded, setAllCardsLoaded] = useState(false);
  const [unmatchedLoaded, setUnmatchedLoaded] = useState(false);
  const [userPhotos, setUserPhotos] = useState([]);
  
  useEffect(()=>{
    getAllImageURLsByUser(auth.currentUser.uid).then(arrayOfUrls=>{
      setUserPhotos(arrayOfUrls);
      console.log(userPhotos)
    })
  },[])

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
    <View style={styles.list}>
      {userPhotos.map((photoUrl)=>{
        if (/(.+com\/o\/__.+)\w+/.test(photoUrl)) {
          return (
            <Image 
              style={{width: 100, height: 150}}
              source={{uri: photoUrl}}
              />
          )
        }
      })}
    </View>
  )

  const loadAllCards = () => {
    setAllCardsLoaded(true);
  };

  const hideAllCards = () => {
    setAllCardsLoaded(false);
  };

  const loadUnmatched = () => {
    setUnmatchedLoaded(true);
  }

  const hideUnmatched = () => {
    setUnmatchedLoaded(false);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.titleText}>Matched Dogs!</Text>
      <Text style={styles.subtitleText}>How many will you collect?</Text>
      <Text style={styles.mainText}>Nine most popular breeds...</Text>
      <GalleryNine />
      <Text style={styles.mainText}>All breeds...</Text>
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
    width: 82
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
    fontSize: 16, 
  },
  subtitleText: { 
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

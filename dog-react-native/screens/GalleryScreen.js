import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react';
import { getAllImagePaths } from '../storage-api';

const GalleryScreen = () => {
  const [unmatchedLoaded, setUnmatchedLoaded] = useState(false);

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
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7a4815", 
    color: "#fff", 
    fontSize: 20, 
    marginLeft: 20,
    marginTop: 10,
    padding: 5
  },
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  mainText: { 
    color: "#a45c5c", 
    fontWeight: "700", 
    fontSize: 16, 
    paddingLeft: 20 
  },
  titleText: { 
    color: "#a45c5c", 
    fontWeight: "900", 
    fontSize: 24, 
    paddingLeft: 20,
    paddingTop: 20,
  },
});

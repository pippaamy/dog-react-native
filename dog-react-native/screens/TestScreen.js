import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import * as RNFS from 'react-native-fs';

// // readFile(filepath: string, encoding?: string)
// RNFS.readFile('/root/northcoders/project/dog-react-native/dog-react-native/public/model/weights.bin',
// 'ascii'
// ).then(res => {
//     console.log(res);})
// .catch(err => {
//     console.log(err.message, err.code);
// });

const TestScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>Test Screen</Text>
      <View><TouchableOpacity onPress={()=>{navigation.replace("Login")}}><Text> Log in Screen </Text></TouchableOpacity></View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
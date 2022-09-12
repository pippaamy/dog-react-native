import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addFriend, getUserData, getUserDatabyUID } from "../api";
import { auth } from "../firebase";
import { Button } from "react-native-elements";

const FriendsScreen = () => {
  const [loggedInUser,setLoggedInUser]= useState({})
  const [viewAll,setViewAll] = useState(false)
  const [friendsList,setFriendsList] = useState([])
  const [allUsers,setAllUsers] = useState([])
  const [friendsData,setFriendData]= useState([])
  useEffect(()=>{
    getUserDatabyUID(auth.currentUser.uid)
    .then(user=>{
      setLoggedInUser(user)
      setFriendsList(user.friends)
      return user.friends
    }).then((friends)=>{
      console.log({friends});
     return Promise.all(friends.map(friend=>getUserDatabyUID(friend)))
    }).then(data=>{
      setFriendData(data)
    })
    .then(()=>{
      return getUserData()
    })
    .then(data=>{
      setAllUsers(data)
    })
   
    
  },[viewAll])


    if(viewAll){
    return (<>
      <View style={styles.container}>
        <Text style={styles.title}>All users</Text>
      </View>
      {allUsers.map(userData=>{
        let {displayName, photoUrl, email,uid}= userData
        return<View key={uid} style={{...styles.container, flexDirection:'row'}}>
            <Image source={{uri:photoUrl}} style={{width:10, height:10}}/>
        <Text style={styles.title}> {displayName?displayName +"  |  " +email: email}</Text> 
        {friendsList.includes(uid)?null:<TouchableOpacity  onPress={()=>addFriend(uid)}><Text> Add friend </Text></TouchableOpacity>}
      </View>
      })}
      <TouchableOpacity onPress={()=>setViewAll((x)=>!x)} style={styles.button}>
            <View style={styles.button}>
              <Text style={styles.buttonText}> View friends! </Text>
            </View>
          </TouchableOpacity>
      </>)
    } else  return (<>
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
    </View>
    {friendsData.map(friend=>{
        const {displayName, photoUrl, email,uid}= friend
        return<View key={uid} style={{...styles.container, flexDirection:'row'}}>
        <Text style={styles.title}> {displayName?displayName +"  |  " +email: email}</Text> 
      </View>
      })}
    <TouchableOpacity onPress={()=>setViewAll((x)=>!x)} style={styles.button}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Find more friends! </Text>
          </View>
        </TouchableOpacity>
    </>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6d186",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#dc7646",
    width: "100%",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  smallButton:{
    padding:0,
    height: "4em"
  },
  smallButtonText:{
    fontSize:1
  }
});

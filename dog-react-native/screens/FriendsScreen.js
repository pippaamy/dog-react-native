import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addFriend, getUserData, getUserDatabyUID } from "../api";
import { auth } from "../firebase";
import { Button } from "react-native-elements";

const FriendsScreen = () => {
  const [viewAll,setViewAll] = useState(false)
  const [allUsers,setAllUsers] = useState([])
  const [friendsData,setFriendData]= useState([])
  const [loggedInUser,setLoggedInUser] =useState({...auth.currentUser, friends:[]})
  useEffect(()=>{
    getUserData()
    .then(dataArray=>{
      let loggedUserData ={}
      dataArray.forEach(item=>{
        if (item.uid === auth.currentUser.uid) {
          loggedUserData=item
          setLoggedInUser(item)
        }
      })
      setAllUsers(dataArray)
      setFriendData( dataArray.filter(item=>loggedUserData.friends.includes(item.uid))
        )
    })
  },[viewAll])

  function addFriendFront(uid){
    return addFriend(uid).then((res)=>{
      setLoggedInUser(current=>{
        let updated =current
        updated.friends.push(uid)
        return updated
      })
      setTimeout( ()=>setAllUsers(x=>x), 300)
    })
  }
  
    if(viewAll){
    return (<>
      <View style={styles.container}>
        <Text style={styles.title}>All users</Text>
      </View>
      {allUsers.map(userData=>{
        let {displayName, photoURL, email,uid}= userData
        if (!photoURL) {photoURL= 'https://cdn-icons-png.flaticon.com/512/1250/1250689.png'}
        return<View key={uid} style={{...styles.container, flexDirection:'row'}}>
            <Image source={{uri:photoURL}} style={{width:15, height:15}}/>
        <Text style={styles.title}> {displayName?displayName +"  |  " +email: email}</Text> 
        {loggedInUser.friends.includes(uid)?null
        :<TouchableOpacity  onPress={()=>addFriendFront(uid)}><Text> Add friend </Text></TouchableOpacity>}
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
      <Text style={styles.title}> Friends </Text>
    </View>
    {friendsData.map(friend=>{
        let {displayName, photoURL, email,uid}= friend
        if (!photoURL) {photoURL= 'https://cdn-icons-png.flaticon.com/512/1250/1250689.png'}
        return<View key={uid} style={{...styles.container, flexDirection:'row'}}>
          <Image source={{uri:photoURL}} style={{width:15, height:15}}/>
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

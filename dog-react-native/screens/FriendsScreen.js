import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addFriend, getUserData } from "../api";
import { auth } from "../firebase";
import FriendProfile from "./FriendProfile";

const FriendsScreen = () => {
  const [viewAll, setViewAll] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [friendsData, setFriendData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({
    ...auth.currentUser,
    friends: [],
  });
  const [reloadVar, setReloadVar] = useState(0);
  const [profileInView, setProfileInView] = useState(false);
  const [friendProps, setFriendProps] = useState({
    profileInView,
    setProfileInView,
  });
  const [isLoading, setIsLoading] = useState(true);
  function reload() {
    setReloadVar((x) => x + 1);
  }
  useEffect(() => {
    getUserData().then((dataArray) => {
      let loggedUserData = {};
      dataArray.forEach((item) => {
        if (item.uid === auth.currentUser.uid) {
          loggedUserData = item;
          setLoggedInUser(item);
        }
      });
      setAllUsers(dataArray);
      setFriendData(
        dataArray.filter((item) => loggedUserData.friends.includes(item.uid))
      );
    });
  }, []);
  useEffect(() => {}, [reloadVar]);

  function addFriendFront(uid) {
    setIsLoading(false);
    return addFriend(uid)
      .then((res) => {
        setIsLoading(true);
        setLoggedInUser((current) => {
          let updated = current;
          updated.friends.push(uid);
          return updated;
        });
        // console.log( friendsData);
        setFriendData((current) => {
          let updated = current;
          updated.push(allUsers.filter((item) => item.uid === uid)[0]);
          return updated;
        });
        // console.log(friendsData);
        // console.log(loggedInUser);
      })
      .then(reload);
  }
  function viewProfile(data) {
    setFriendProps({ profileInView, setProfileInView, ...data });
    setProfileInView(true);
  }
  return profileInView ? (
    <FriendProfile {...friendProps} />
  ) : viewAll ? (
    <>
      <View style={{backgroundColor: "#f6d186",
    alignItems: "flex-end"}}>
        <Text>{isLoading ? <></> : <Text>Adding...</Text>}</Text>
      </View>
      <ScrollView style={{ backgroundColor: "#f6d186" }}>
        {allUsers.map((userData) => {
          let { displayName, photoURL, email, uid } = userData;
          if (!photoURL) {
            photoURL =
              "https://cdn-icons-png.flaticon.com/512/1250/1250689.png";
          }
          return (
            <>
              <View
                key={uid}
                style={{ ...styles.container, flexDirection: "row" }}
              >
                {/* <TouchableOpacity onPress={()=>viewProfile(userData)}> */}
                <View>
                  <Image
                    source={{ uri: photoURL }}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                {/* </TouchableOpacity> */}
                <Text style={styles.title}>
                  {" "}
                  {
                    displayName || "Guest " + uid.substring(0, 4)
                    // displayName?displayName+"  |  " +email: email
                  }
                </Text>
                {loggedInUser.friends.includes(uid) ? (
                  <Text> Your Friend !</Text>
                ) : loggedInUser.uid === uid ? (
                  <Text> You!</Text>
                ) : (
                  <TouchableOpacity
                    style={styles.smallButton}
                    onPress={() => addFriendFront(uid)}
                  >
                    <Text> Add friend </Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        onPress={() => setViewAll((x) => !x)}
        style={styles.button}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}> View friends! </Text>
        </View>
      </TouchableOpacity>
    </>
  ) : (
    <>
      <ScrollView style={{ backgroundColor: "#f6d186" }}>
        {friendsData.map((friend) => {
          let { displayName, photoURL, email, uid } = friend;
          if (!photoURL) {
            photoURL =
              "https://cdn-icons-png.flaticon.com/512/1250/1250689.png";
          }
          return (
            <View
              key={uid}
              style={{ ...styles.container, flexDirection: "row" }}
            >
              <TouchableOpacity onPress={() => viewProfile(friend)}>
                <View>
                  <Image
                    source={{ uri: photoURL }}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.title}>
                {" "}
                {(displayName || "Guest " + uid.substring(0, 4)) +
                  "   |   " +
                  email}
              </Text>
            </View>
          );
        })}
        {friendsData.length === 0 ? (
          <View style={styles.container}>
            <Text> Find friends with the button below ! </Text>
          </View>
        ) : null}
      </ScrollView>
      <TouchableOpacity
        onPress={() => setViewAll((x) => !x)}
        style={styles.button}
      >
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
    justifyContent: "space-between",
    paddingLeft: 40,
    margin: 5,
    marginRight: 40,
  },
  button: {
    backgroundColor: "#dc7646",
    width: "100%",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  smallButton: {
    backgroundColor: "#dc7646",
    borderRadius: 10,
  },
  smallButtonText: {
    fontSize: 1,
  },
});

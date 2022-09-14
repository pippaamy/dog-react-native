import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";



export default function FriendProfile(props){
const {profileInView,setProfileInView, displayName,uid,photoURL,email,imagePaths} = props
    const dogs=[]
    imagePaths.forEach(path=>{
        const name = path.split('_')[0]
        if(!dogs.includes(name)) dogs.push(name)
    })
    function backToFriends(){
        setProfileInView(false)
    }
    return <><View style={styles.container}>
        <Image source={{ uri: photoURL || 'https://cdn-icons-png.flaticon.com/512/1250/1250689.png'}} style={{ width: 200, height: 200 }} />
    <Text>Name: {displayName} </Text>
    <Text>Email: {email}</Text>
    <Text style={styles.dogCatch}>
      Dogs caught : {dogs.length}/50
    </Text>
  </View>
<TouchableOpacity onPress={backToFriends} style={styles.button}>
            <View style={styles.button}>
              <Text style={styles.buttonText}> Back </Text>
            </View>
          </TouchableOpacity>
    </>
}
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
    }})
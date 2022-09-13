import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image, Text } from "react-native-elements";
import { patchProfile } from "../api";
import { auth } from "../firebase";

const ProfileInfo = ({ edit, setEdit }) => {
  const [password, setPassword] = useState(undefined);
  const [email, setEmail] = useState(auth.currentUser.email);
  const [name, setName] = useState(auth.currentUser.displayName || "Guest");

  const handleBack = () => {
    setEdit((x) => !x);
  };

  const handleSubmit = () => {
    patchProfile(name, undefined, email, password).then(() => {
      setEdit((x) => !x);
    });
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <Image
            source={require("../public/images/draw.png")}
            style={{
              width: 50,
              height: 30,
              display: "flex",
              flexDirection: "row",
            }}
            resizeMode="contain"
            resizeMethod="resize"
            justifyContent="center"
            alignItems="left"
          />
          <TextInput
            placeholderTextColor="gray"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="gray"
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <Text> {"\n"}</Text>

          <TouchableOpacity onPress={handleBack} style={styles.button}>
            <Text style={styles.buttonText}>Go back to Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}> Submit changes</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ProfileInfo;
const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#f6d186",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#dc7646",
    width: "70%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 3,
  },

  input: {
    fontSize: 23,
  },
  buttonText: {
    fontWeight: "700",
  },
});

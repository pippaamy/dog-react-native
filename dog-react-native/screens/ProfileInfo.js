import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-elements";
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
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
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
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity onPress={handleBack} style={styles.button}>
        <Text style={styles.buttonText}>Go back to Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}> Submit changes</Text>
      </TouchableOpacity>
    </>
  );
};

export default ProfileInfo;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dc7646",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    fontSize: 23,
  },
});

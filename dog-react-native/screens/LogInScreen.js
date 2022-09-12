import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { createEmailAndUser } from "../api";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        // // navigation.replace("Camera");
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createEmailAndUser(email, password);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.replace("Main");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: 20,
          backgroundColor: "#f6d186",
        }}
      >
        <Image
          source={require("../public/images/weenies.gif")}
          style={{
            width: 320,
            height: 200,
            display: "flex",
            flexDirection: "row",
          }}
          resizeMode="contain"
          resizeMethod="resize"
          justifyContent="center"
          alignItems="center"
        />
      </View>
      <Text style={styles.title}> GONE FOR A BORK</Text>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}> Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}> Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Main");
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>
              {" "}
              ShortCut to Main (delete later){" "}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.replace("Test");
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>
              {" "}
              Go to test screen (delete this later){" "}
            </Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6d186",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#dc7646",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#dc7646",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#dc7646",
    fontWeight: "700",
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f6d186",
  },
});

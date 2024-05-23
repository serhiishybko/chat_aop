import React, { useState, useLayoutEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { styles } from "../utils/styles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { auth } from "../utils/firebase";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("w.golli@qinsights.ai");
  const [password, setPassword] = useState("test123456");

  const handleSignIn = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          return userCredential.user.getIdToken();
        })
        .then((idToken) => {
          fetch("https://api.finanalyst.ai/login/", {
            method: "POST",
            email: email,
            password: password,
            headers: {
              "Content-type": "application/json",
              "X-CSRFToken": "Bearer " + idToken,
            },
          });
        })
        .then(() => {
          navigation.navigate("Messaging");
        })
        .catch((err) => Alert.alert("Login error", err.message));
    } else {
      Alert.alert("Email and Password is required.");
    }
  };

  return (
    <View style={styles.loginscreen}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.loginform}>
        <Text style={styles.loginheading}>Sign in</Text>
        <TextInput
          style={styles.logininput}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.logininput}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={handleSignIn} style={styles.loginbutton}>
          <View>
            <Text style={styles.loginbuttonText}>Sign In</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#EC407A", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export default SignIn;

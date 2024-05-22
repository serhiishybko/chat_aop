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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeEmail = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      navigation.navigate("Chat");
    } catch (e) {
      Alert.alert("Error! While saving info");
    }
  };

  const handleSignIn = () => {
    if (email.trim() && password.trim()) {
      storeEmail();
    } else {
      Alert.alert("Email and Password is required.");
    }
  };

  // const handleSignIn = () => {
  //   console.log(auth, email, password);
  //   if (email !== "" && password !== "") {
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then(() => console.log("Login success"))
  //       .catch((err) => Alert.alert("Login error", err.message));
  //   } else {
  //     Alert.alert("Email and Password are require");
  //   }
  // };

  useLayoutEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("email");
        if (email !== null || password !== null) {
          navigation.navigate("Chat");
        }
      } catch (e) {
        console.error("Error while loading email or password!");
      }
    };
    getEmail();
  }, []);

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

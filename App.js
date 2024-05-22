import React from "react";

//👇🏻 app screens
import SignIn from "./screens/Signin";
import Messaging from "./screens/Messaging";
import Chat from "./screens/Chat";

//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signin"
          component={SignIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "Chats",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Messaging"
          component={Messaging}
          options={{
            headerStyle: {
              backgroundColor: "#111111",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

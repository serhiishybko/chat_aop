import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import socket from "../utils/socket";
import { auth } from "../utils/firebase";
import MessageComponent from "../component/MessageComponent";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";
// import WS from "react-native-websocket";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Messaging = () => {
  const [user, setUser] = useState("");
  const [id, setId] = useState(0);
  // const { name, id } = route.params;
  // route and navigation need

  const socket = new WebSocket(
    "wss://api.finanalyst.ai/ws/startInterview",
    "protocolOne"
  );

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    const data = {
      message: message,
      type: "profit_loss",
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNjOTNjMWEyNGNhZjgyN2I4ZGRlOWY4MmQyMzE1MzY1MDg4YWU2MTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmludGVjaC01YzQzYyIsImF1ZCI6ImZpbnRlY2gtNWM0M2MiLCJhdXRoX3RpbWUiOjE3MTYzNjY4MTYsInVzZXJfaWQiOiJ1Nzh1R1E2WTkzU3dONzhCcVdpME5YQnhjRWEyIiwic3ViIjoidTc4dUdRNlk5M1N3Tjc4QnFXaTBOWEJ4Y0VhMiIsImlhdCI6MTcxNjM2NjgxNywiZXhwIjoxNzE2MzcwNDE3LCJlbWFpbCI6IncuZ29sbGlAcWluc2lnaHRzLmFpIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIncuZ29sbGlAcWluc2lnaHRzLmFpIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.DNV9--6j85WdwS4QEde7M3o6JKtZPejzi54__12-JaysqfwCnByDmJ88LT7xajpfgYsgZl8C_W0JaNAeiSd89TSxu2N3NTxvT1tkd0EqvXpTAykYyaUJp1GwApwVVSyUVYMhzBOq01gUqPwTf7h86fT-B-IRANABIhQbJz__QwCAf1o1RaVQqpx8ivwjlNXardbheKUKForjG_sJR11z-giMlPc9pKY9dbmWZF6cD3JKoj5MTESaOTdCb-W0cqnSOaxSPqDO2JeQ5X1-pOCb9vORINz62F6_gqct9tGWUwzmEzJOOhuftiUtYXdRsR-0VN9vELSHVeIBzYVYqVIUVw",
    };

    console.log(id, chatMessages);

    setChatMessages([
      ...chatMessages,
      {
        text: message,
        user: user,
        time: hour + ":" + mins,
        id: id,
      },
    ]);
    if (user) {
      socket.send(JSON.stringify(data));

      // socket.onmessage = (event) => {
      //   // A message was received
      //   const msg = JSON.parse(event.data);
      //   console.log(msg);
      // };
      setMessage("");
    }

    setId(id + 1);
  };

  socket.onerror = (error) => {
    // An error occurred
    console.error("WebSocket Error:", JSON.stringify(error));
  };

  useEffect(() => {
    const user = auth.currentUser;
    setUser(user.email);
    console.log(user.email);
    socket.onopen = () => {
      // Connection opened
      console.log("connected");
      socket.send("connected server!");
    };
  }, [socket]);

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({ item }) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
          value={message}
        />
        <TouchableOpacity
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Ionicons name="send" size={24} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messaging;

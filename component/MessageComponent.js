import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";

export default function MessageComponent({ item, user }) {
  const status = item.user !== user;

  return (
    <View>
      <View
        style={
          status
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="person-circle-outline"
            size={30}
            color="white"
            style={styles.mavatar}
          />
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, { backgroundColor: "#2196f3" }]
            }
          >
            <Text style={{ color: "white" }}>{item.text}</Text>
            {status ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ alignItems: "flex-start", color: "white" }}>
                  {"~" + item.user}
                </Text>
                <Text style={{ color: "white", alignItems: "flex-end" }}>
                  {item.time}
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "white" }}>{item.time}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

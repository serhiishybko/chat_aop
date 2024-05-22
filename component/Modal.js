import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Modal = ({ setVisible }) => {
  const closeModal = () => setVisible(false);
  const [groupName, setGroupName] = useState("");

  const handleCreateRoom = () => {
    if (groupName.trim()) {
      socket.emit("createRoom", groupName);
      closeModal();
    } else {
      Alert.alert("Group Name is required.");
    }
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={styles.logininput}
        placeholder="Enter Group Name"
        autoCapitalize="none"
        textContentType="groupName"
        autoFocus={true}
        value={groupName}
        onChangeText={(value) => setGroupName(value)}
      />
      <View style={styles.modalbuttonContainer}>
        <TouchableOpacity
          style={[styles.modalbutton, { backgroundColor: "grey" }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {Ionicons} from "react-native-vector-icons";
import Colors from '@/constants/Colors';



const ChatBubble = ({role, text, onSpeech}) => {
  return (
    <View style={[styles.chatItem,
        role === "user" ? styles.userChatItem : styles.modelChatItem,
    ]}>
      <Text style ={styles.chatText}>{text}</Text>
      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
            <Ionicons name = "volume-high-outline" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: "70%",
        position: "relative",
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: "#007AFF",
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#00008B",
    },
    chatText: {
        fontSize: 16,
        color: "#fff",
    },
    speakerIcon: {
        position: "absolute",
        bottom: 5,
        right: 5,
    },
});

export default ChatBubble
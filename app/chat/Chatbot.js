import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import React,  {useState} from 'react';
import axios from 'axios';
import ChatBubble from "./ChatBubble";
import {speak, isSpeakingAsync, stop } from "expo-speech";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyB-k_fIGXk6uqNMECrLlN1kmT6CBmCLZlY";

  const handleUserInput = async () => {
    // Add user input to the chat without the prompt text
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],  // Only store the user's actual input
      },
    ];
  
    setLoading(true);
  
    try {
      // Send the entire prompt (with predefined instruction) to the API
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: "Act as a doctor and answer to this in short, if the question is not related to the medical field say you don't have the expertise, the question is," + userInput }]
            }
          ],
        }
      );
  
      console.log("Gemini Pro API Response: ", response.data);
  
      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  
      if (modelResponse) {
        // Add the model response to the chat
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
  
        setChat(updatedChatWithModel);
        setUserInput("");  // Clear user input after submission
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API:", error);
      console.error("Error response:", error.response);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

 const handleSpeech = async (text) => {
    if (isSpeaking) {
      // If already speaking, stop the speech
      stop();
      setIsSpeaking(false);
    }else{
      //If not speaking, start the speech
      if(!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
 };

 const renderChatItem = ({ item }) => (
  <ChatBubble
    role = {item.role}
    text = {item.parts[0].text}
    onSpeech = {() => handleSpeech(item.parts[0].text)}
    />

 );
  return (
    <ImageBackground 
    source={require("../../assets/images/bg.jpg")}
    style={styles.bgImg} >
    <View style = {styles.container}>
      <Text style ={styles.title}>DOCBOT</Text>
      <FlatList
        data = {chat}
        renderItem = {renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle = {styles.chatContainer}
        />
        <View style = {styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Type your message...'
            placeholderTextColor="#aaa"
            value ={userInput}
            onChangeText={setUserInput}
            />
          <TouchableOpacity style={styles.button} onPress ={handleUserInput}>
            <Text style = {styles.buttonText}>Send</Text>
            </TouchableOpacity> 
        </View>
        {loading && <ActivityIndicator style={styles.loading} color="#333"/>}
        {error && <Text style={styles.error}>{error}</Text>}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
    // borderWidth: 2,
    borderColor:'black',
    padding: 2,
    // backgroundColor: 'black',
    borderRadius:5,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",  
    borderRadius: 10,
    borderWidth: 2,
    borderColor:'black',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 70,
    marginRight: 10,
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 25,
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: 20,
    backgroundColor: "#007AFF",
    borderRadius: 25,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  bgImg:{
    height:"100%",
  }

});

export default Chatbot;
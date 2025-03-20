import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import ChatBubble from './ChatBubble';
import { speak, isSpeakingAsync, stop } from 'expo-speech';

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = 'AIzaSyAAe78AypounpbGwxa2JYKN4XYhSwmvRqk'; // Replace with your actual key if different

  const handleUserInput = async () => {
    // Add user input to chat
    const updatedChat = [
      ...chat,
      { role: 'user', parts: [{ text: userInput }] },
    ];
    setChat(updatedChat);
    setLoading(true);
    setError(null);

    try {
      // API call using gemini-2.0-flash
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{
            parts: [{ text: `Act as a doctor and answer this in short, if the question is not related to the medical field say you don't have the expertise: ${userInput}` }],
          }],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      const updatedChatWithModel = [
        ...updatedChat,
        { role: 'model', parts: [{ text: modelResponse }] },
      ];
      setChat(updatedChatWithModel);
      setUserInput('');
    } catch (error) {
      console.error('Error calling Gemini API:', error.response?.data || error.message);
      setError('Failed to get a response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else if (!(await isSpeakingAsync())) {
      speak(text);
      setIsSpeaking(true);
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.bgImg}>
      <View style={styles.container}>
        <Text style={styles.title}>DOCBOT</Text>
        <FlatList
          data={chat}
          renderItem={renderChatItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={handleUserInput} disabled={loading}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={styles.loading} color="#333" />}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 30, fontWeight: 'bold', color: 'black', marginBottom: 20, marginTop: 40, textAlign: 'center', borderColor: 'black', padding: 2, borderRadius: 5 },
  chatContainer: { flexGrow: 1, justifyContent: 'flex-end', backgroundColor: 'white', borderRadius: 10, borderWidth: 2, borderColor: 'black' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, height: 70, marginRight: 10, padding: 15, borderColor: 'black', borderWidth: 2, borderRadius: 25, color: '#333', backgroundColor: '#fff' },
  button: { padding: 20, backgroundColor: '#007AFF', borderRadius: 25, shadowColor: '#333', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 3 },
  buttonText: { color: '#fff', textAlign: 'center' },
  loading: { marginTop: 10 },
  error: { color: 'red', marginTop: 10 },
  bgImg: { height: '100%' },
});

export default Chatbot;
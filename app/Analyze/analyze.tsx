import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import axios from 'axios';

export default function Analyze() {
  const [symptoms, setSymptoms] = useState<string>(''); // State for symptom input
  const [prediction, setPrediction] = useState<any>(null); // State for prediction result
  const [error, setError] = useState<string | null>(null); // State for error message
  const [loading, setLoading] = useState<boolean>(false); // State for loading animation
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State for modal visibility

  const handleAnalyze = async () => {
    try {
      setError(null);
      setPrediction(null);
      setLoading(true); // Show loading animation
      const response = await axios.post('http://192.168.1.2:5000/predict', { // Replace with your server URL
        symptoms: symptoms,
      });
      setPrediction(response.data);
      setModalVisible(true); // Show modal with results
    } catch (err) {
      setError('Failed to analyze symptoms. Please check your connection or input.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <View style={styles.paneContainer}>
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.bgImg} />
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/profile/1')} style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: 'https://xsgames.co/randomusers/avatar.php?g=male',
                }}
                style={{ width: 40, height: 40, borderRadius: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
                shadowColor: '#171717',
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.pane}>
        <View>
          <Text style={styles.paneTitle}>Analyze your Symptoms</Text>
          <Text style={styles.title}>Enter your Symptoms</Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            placeholder="e.g., anxiety, nervousness"
            value={symptoms}
            onChangeText={setSymptoms}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAnalyze} disabled={loading}>
          <Text style={{ fontSize: 20, color: Colors.white }}>Analyze</Text>
        </TouchableOpacity>

        {/* Loading Animation */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primaryBlue} />
            <Text style={styles.loadingText}>Analyzing...</Text>
          </View>
        )}

        {/* Error Message */}
        {error && !loading && <Text style={styles.error}>{error}</Text>}
      </View>

      {/* Modal for Prediction Results */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Prediction Results</Text>
            {prediction && (
              <>
                <Text style={styles.modalText}>Random Forest: {prediction.rf_model_prediction}</Text>
                <Text style={styles.modalText}>Naive Bayes: {prediction.naive_bayes_prediction}</Text>
                <Text style={styles.modalText}>SVM: {prediction.svm_model_prediction}</Text>
                <Text style={styles.modalFinalPrediction}>
                  Final Prediction: {prediction.final_prediction}
                </Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
  },
  pane: {
    position: 'absolute',
    backgroundColor: Colors.white,
    top: '30%',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  paneContainer: {
    backgroundColor: 'green',
    flex: 1,
  },
  textInput: {
    borderWidth: 2,
    borderColor: Colors.primaryBlue,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    height: 150,
  },
  button: {
    marginTop: 15,
    backgroundColor: Colors.primaryBlue,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  paneTitle: {
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    padding: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primaryBlue,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalFinalPrediction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryBlue,
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
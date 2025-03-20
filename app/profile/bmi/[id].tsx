import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress'; // Import the meter

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKilo = parseFloat(weight);
    if (!isNaN(heightInMeters) && !isNaN(weightInKilo) && heightInMeters > 0 && weightInKilo > 0) {
      const calculatedBmi = weightInKilo / (heightInMeters * heightInMeters);
      setBmi(calculatedBmi);
    } else {
      alert('Enter valid values for the fields');
    }
    setHeight('');
    setWeight('');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <ImageBackground source={require('../../../assets/images/bg.jpg')} style={styles.bgImg}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.text}>Find out your BMI!</Text>
            <View style={styles.textBoxGroup}>
              <Text>Height: </Text>
              <TextInput
                style={styles.textInput}
                value={height}
                onChangeText={(text) => setHeight(text)}
                keyboardType="numeric"
                placeholder="e.g., 170"
              />
              <Text>cm</Text>
            </View>
            <View style={styles.textBoxGroup}>
              <Text>Weight: </Text>
              <TextInput
                style={styles.textInput}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                keyboardType="numeric"
                placeholder="e.g., 70"
              />
              <Text>kg</Text>
            </View>
            <TouchableOpacity onPress={calculate}>
              <View style={styles.btn}>
                <Text>Calculate</Text>
              </View>
            </TouchableOpacity>

            {/* BMI Meter */}
            {bmi !== null && (
              <View style={styles.meterContainer}>
                <AnimatedCircularProgress
                  size={120} // Diameter of the circle
                  width={15} // Thickness of the ring
                  fill={(bmi / 40) * 100} // Scale BMI (assuming max 40 for visualization)
                  tintColor={getBmiColor(bmi)} // Color based on BMI range
                  backgroundColor="#e0e0e0" // Gray background for unfilled portion
                  rotation={0} // Start from top
                >
                  {() => (
                    <Text style={styles.bmiText}>{bmi.toFixed(1)}</Text>
                  )}
                </AnimatedCircularProgress>
                <Text style={styles.bmiLabel}>{getBmiLabel(bmi)}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

// Helper function to determine BMI color
const getBmiColor = (bmi: number) => {
  if (bmi < 18.5) return '#00f'; // Blue for underweight
  if (bmi < 25) return '#0f0'; // Green for normal
  if (bmi < 30) return '#ff0'; // Yellow for overweight
  return '#f00'; // Red for obese
};

// Helper function to determine BMI label
const getBmiLabel = (bmi: number) => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: Colors.primaryBlue,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderColor: Colors.white,
    borderWidth: 3,
  },
  text: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'sans-serif',
    alignSelf: 'center',
    color: Colors.white,
  },
  textBoxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  textInput: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    left: 30,
    width: '50%',
  },
  btn: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
  },
  bgImg: {
    height: '100%',
  },
  meterContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  bmiText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  bmiLabel: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.white,
  },
});

export default Bmi;
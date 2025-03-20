import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

// Get screen width for responsive sizing
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Adjust BOX_WIDTH to account for the parent's width (85% of screen width) and padding
const PARENT_WIDTH = SCREEN_WIDTH * 0.85; // Parent has width: '85%'
const BOX_WIDTH = (PARENT_WIDTH - 40) / 2; // 2 columns with padding/margins (10px on each side + 10px between boxes)

export default function FunctionBoxes() {
  return (
    <View style={styles.gridContainer}>
      {/* Box 1: BMI */}
      <TouchableOpacity
        onPress={() => router.push('/profile/bmi/1')}
        accessibilityLabel="Check your BMI"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/bmi.webp')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Check your BMI here!</Text>
        </View>
      </TouchableOpacity>

      {/* Box 2: Water Intake */}
      <TouchableOpacity
        onPress={() => router.push('/profile/waterIntake/1')}
        accessibilityLabel="Track your water intake"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/water.jpeg')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Track your water intake!</Text>
        </View>
      </TouchableOpacity>

      {/* Box 3: Calories */}
      <TouchableOpacity
        onPress={() => router.push('/profile/calories/1')}
        accessibilityLabel="Burn your calories"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/lifestyle.jpg')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Burn your calories</Text>
        </View>
      </TouchableOpacity>

      {/* Box 4: Meal Scanner */}
      <TouchableOpacity
        onPress={() => router.push('/profile/mealScanner/1')}
        accessibilityLabel="Scan your meal"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/lifestyle.jpg')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Scan your meal</Text>
        </View>
      </TouchableOpacity>

      {/* Box 5: Sleep Tracker */}
      <TouchableOpacity
        onPress={() => router.push('/profile/sleepTracker/1')}
        accessibilityLabel="Track your sleep"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/water.jpeg')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Track your sleep</Text>
        </View>
      </TouchableOpacity>

      {/* Box 6: Steps Counter */}
      <TouchableOpacity
        onPress={() => router.push('/profile/stepsCounter/1')}
        accessibilityLabel="Count your steps"
      >
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/water.jpeg')}
            style={styles.boxImg}
          />
          <Text style={styles.boxText}>Count your steps</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: -80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Padding on the sides
  },
  box: {
    width: BOX_WIDTH, // Adjusted width for 2 columns
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
    marginBottom: 10, // Spacing between rows
  },
  boxImg: {
    width: '100%', // Image takes full width of the box
    height: BOX_WIDTH * 0.5625, // Maintain aspect ratio (16:9)
    borderRadius: 10,
  },
  boxText: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
});
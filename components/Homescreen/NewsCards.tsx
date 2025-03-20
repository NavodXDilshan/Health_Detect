import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { router } from 'expo-router';

// Get screen width for responsive image sizing
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7; // 70% of screen width for each card

export default function NewsCards() {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10, // Add padding to the edges for a better look
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/profile/bmi/1')}
          accessibilityLabel="Check your BMI"
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/bmi.webp')}
              style={styles.cardImg}
            />
            <Text style={styles.cardImageTxt}>Check your BMI here!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/profile/waterIntake/1')}
          accessibilityLabel="Track your water intake"
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/water.jpeg')}
              style={styles.cardImg}
            />
            <Text style={styles.cardImageTxt}>Track your water intake for the day!</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/profile/calories/1')}
          accessibilityLabel="Burn your calories"
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/lifestyle.jpg')}
              style={styles.cardImg}
            />
            <Text style={styles.cardImageTxt}>Burn your calories</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/profile/mealScanner/1')}
          accessibilityLabel="Scan your meal"
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/lifestyle.jpg')} // Use a different image
              style={styles.cardImg}
            />
            <Text style={styles.cardImageTxt}>Scan your meal</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
    marginRight: 10, // Kept marginRight for spacing between cards
  },
  cardImg: {
    width: CARD_WIDTH, // Responsive width
    height: CARD_WIDTH * 0.5625, // Maintain aspect ratio (e.g., 16:9)
    borderRadius: 10,
  },
  cardImageTxt: {
    marginTop: 5,
    fontSize: 16,
    color: Colors.white, // Ensure text is readable on a blue background
    textAlign: 'center', // Center the text
  },
});
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import NewsCards from '@/components/Homescreen/NewsCards';
import FunctionBoxes from '@/components/Homescreen/FunctionBoxes';

export default function Index() {
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
                defaultSource={require('../../assets/images/lifestyle.jpg')}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/')} // Navigate to a notifications screen
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.pane}>
          <NewsCards />
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.pane}>
          <FunctionBoxes />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  pane: {
    marginTop: '10%', // This adds the margin from the top
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
  paneContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 60, // Add padding to account for the transparent header
    paddingBottom: 20,
  },
});
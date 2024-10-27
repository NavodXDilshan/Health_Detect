import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import {Stack} from 'expo-router'

export default function App() {
  return (
    <>
    <Stack.Screen options={{
        headerTransparent: true,
        headerTitle:"",
    }}/>
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert, ActivityIndicator, TextInput, Button } from 'react-native';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import { db } from '../(tabs)/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

// Define the type for the region
type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface PersonData {
  name: string;
  Lat: string;  // Latitude as a string
  Long: string; // Longitude as a string
}

export default function App() {
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<PersonData | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Search bar state

  useEffect(() => {
    const userRef = doc(db, 'locations', 'k.m.navoddilshan@gmail.com');
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const personData = doc.data() as PersonData;
        setPerson(personData);

        if (personData.Lat && personData.Long) {
          setCurrentRegion({
            latitude: parseFloat(personData.Lat), // Convert Lat to number
            longitude: parseFloat(personData.Long), // Convert Long to number
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } else {
        setPerson(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permissions are required to use this feature.'
        );
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentRegion((prevRegion) =>
        prevRegion || {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      );
      setLoading(false);
    })();
  }, []);

  // Function to handle search for coordinates and update the map's region
  const handleSearch = () => {
    const coordinates = searchQuery.split(',');

    if (coordinates.length === 2) {
      const lat = parseFloat(coordinates[0].trim());
      const lng = parseFloat(coordinates[1].trim());

      if (!isNaN(lat) && !isNaN(lng)) {
        setCurrentRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert('Invalid Coordinates', 'Please enter valid latitude and longitude values.');
      }
    } else {
      Alert.alert('Invalid Format', 'Please enter coordinates in the format: latitude,longitude');
    }
  };

  if (loading || !currentRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Enter coordinates (lat, lng)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>

        <MapView
          style={styles.map}
          region={currentRegion}
          showsUserLocation
        >
          {person?.Lat && person?.Long && (
            <Marker
              coordinate={{
                latitude: parseFloat(person.Lat), // Convert Lat to number
                longitude: parseFloat(person.Long), // Convert Long to number
              }}
              title="Firestore Location"
              description={`Lat: ${person.Lat}, Lng: ${person.Long}`}
            />
          )}
        </MapView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
});

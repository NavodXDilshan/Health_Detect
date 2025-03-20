// ... (other imports remain the same)
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import { db } from '../(tabs)/firebaseConfig';
import { doc, updateDoc, onSnapshot, collection } from 'firebase/firestore';

export default function Connect() {
  interface DoctorData {
    id: string;
    name: string;
    expertise: string;
    hospital: string;
    rating: number;
  }

  const [doctorList, setDoctorList] = useState<DoctorData[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorData[]>([]);
  const [person, setPerson] = useState<DoctorData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, 'doctors', 'thirana');
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setPerson(doc.data() as DoctorData);
      } else {
        setPerson(undefined);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const collectionRef = collection(db, "doctors");
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const doctors = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<DoctorData, 'id'>),
      }));
      console.log('Fetched doctors:', doctors);
      setDoctorList(doctors);
      setFilteredDoctors(doctors);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    console.log('Search triggered with query:', searchQuery);
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctorList);
      console.log('Showing all doctors');
    } else {
      const filtered = doctorList.filter(doctor => {
        const expertiseArray = doctor.expertise.split(',').map(item => item.trim().toLowerCase());
        return expertiseArray.includes(searchQuery.toLowerCase());
      });
      console.log('Filtered doctors:', filtered);
      setFilteredDoctors(filtered);
    }
  };

  async function updateDoctorContent() {
    try {
      const userDocRef = doc(db, 'doctors', 'k.m.navoddilshan');
      const updateData = { content: searchQuery };
      await updateDoc(userDocRef, updateData);
      console.log('Doctor content updated successfully');
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  }

  const navigateToMessaging = (doctorId: string) => {
    // Use the static route with a parameter object
    router.push({
      pathname: '/messaging/[id]',
      params: { id: doctorId },
    });
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    const maxRating = 5;

    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <Ionicons
          key={`filled-${i}`}
          name="star"
          size={16}
          color="#FFD700"
        />
      );
    }

    for (let i = Math.floor(rating); i < maxRating; i++) {
      stars.push(
        <Ionicons
          key={`unfilled-${i}`}
          name="star-outline"
          size={16}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/profile/1')} style={{ marginLeft: 20 }}>
              <Image
                source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }}
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
      <View style={styles.container}>
        <View style={styles.posting}>
          <TextInput
            placeholder="Search using expertise..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.txtInput}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSearch}>
            <Ionicons name={'search'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            {filteredDoctors.length === 0 ? (
              <Text style={styles.noResults}>No doctors found</Text>
            ) : (
              filteredDoctors.slice().reverse().map((doctor) => (
                <View key={doctor.id} style={styles.doctorCard}>
                  <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                      <Text style={styles.doctorName}>{doctor.name}</Text>
                      <Text style={styles.doctorInfo}>Expertise: {doctor.expertise}</Text>
                      <Text style={styles.doctorInfo}>Hospital: {doctor.hospital}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingLabel}>Rating: </Text>
                        {renderRatingStars(doctor.rating)}
                      </View>
                    </View>
                    <TouchableOpacity 
                      style={styles.messageButton}
                      onPress={() => navigateToMessaging(doctor.id)}
                    >
                      <Ionicons name="chatbubble-ellipses" size={24} color={Colors.primaryBlue} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  posting: {
    padding: 10,
    borderColor: Colors.primaryBlue,
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput: {
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    textAlignVertical: 'center',
    width: '80%',
    backgroundColor: Colors.white,
  },
  sendBtn: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 5,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  doctorCard: {
    backgroundColor: Colors.white,
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryBlue,
    marginBottom: 5,
  },
  doctorInfo: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  ratingLabel: {
    fontSize: 14,
    color: Colors.black,
  },
  messageButton: {
    padding: 10,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.black,
  },
});
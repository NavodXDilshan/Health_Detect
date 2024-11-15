import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import FeedBox from '@/components/feed/FeedBox';
import { db } from '../(tabs)/firebaseConfig';
import { doc, updateDoc, onSnapshot, collection } from 'firebase/firestore';

export default function Feed() {

  interface PersonData {
    count: number;
    id:string;
    name:string;
    content: string;
  }

  const [personList, setPersonList] = useState<PersonData[]>([]);
  const [person, setPerson] = useState<PersonData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [counter, setCounter] = useState<number>(0); // Ensure counter is always a number

  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, 'feed', 'thirana');
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setPerson(doc.data() as PersonData); // Type-cast to PersonData
      } else {
        setPerson(undefined); // Handle the case where document doesn't exist
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Update the counter when `person` is updated
  useEffect(() => {
    if (person?.count !== undefined) {
      setCounter(person.count);
    }
  }, [person]); // Only run when `person` changes

  console.log(person?.count);

  async function update() {
    const userDocRef = doc(db, 'feed', 'k.m.navoddilshan');
    const fieldName = `content_${counter+1}`;
    const updateData: { [key: string]: any } = {};

    setCounter(counter + 1); // Increment counter immediately for UI update
    updateData[fieldName] = content;

    // Update the `content` in Firestore
    await updateDoc(userDocRef, updateData);

    // Update the `count` in the user's document
    await updateDoc(userDocRef, {
      count: counter + 1,
    });
    setContent('');
  }

  useEffect(() => {
    setLoading(true);
    const collectionRef = collection(db, "feed"); // Replace 'feed' with your collection name
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const persons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PersonData, 'id'>), // Spread document data, excluding 'id' in type cast
      }));
      setPersonList(persons);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  

  return (
    <>
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
      <View style={styles.container}>
        <View style={styles.posting}>
          <TextInput
            placeholder="Make your request known..."
            value={content}
            onChangeText={(content) => setContent(content)}
            style={styles.txtInput}
            multiline={true}
          ></TextInput>
          <TouchableOpacity style={styles.sendBtn} onPress={update}>
            <Ionicons name={'send'} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={{ flex: 1 }}>
          {personList.slice().reverse().map((person) => ( // Reverse the list for display
            <View key={person.id} style={styles.feedStyle}>
              <FeedBox person={person} />
          </View>
          ))}
        </ScrollView>


        
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
  feedStyle:{

  }
});

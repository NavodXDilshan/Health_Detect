import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {router, Stack} from 'expo-router'
import {db} from '../../app/(tabs)/firebaseConfig'
import { collection, doc, onSnapshot } from "firebase/firestore";

export default function ProfileContent() {
  interface PersonData {
    name: string;
    dob: string;
    weight:number;
    height: number;
    contact: string;
    email: string;
    gender: string;
  }
  
  const [person, setPerson] = useState<PersonData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const userRef = doc(db, "users", "k.m.navoddilshan@gmail.com");
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setPerson(doc.data() as PersonData);  // Type-cast to PersonData
      } else {
        setPerson(undefined);  // Handle the case where document doesn't exist
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  return (
    <View>
      <View style={{flexDirection:"row",flex:1}}>
        <Text style={styles.titleTxt}>Your Details</Text>
        <TouchableOpacity style={styles.button} onPress={()=>router.push("../profile/editDetails/1")}>
          <View style={styles.editStyle}>
          <Ionicons name="create" size={20} color={"red"} />
          <Text style={{fontSize:20,color:"red",marginLeft:5}}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={30} color={"green"} />
        <Text style={styles.contentTxt}>{person?.name}</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="male-female" size={30}/>
        <Text style={styles.contentTxt}>{person?.gender}</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="calendar" size={30}/>
        <Text style={styles.contentTxt}>{person?.dob}</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="accessibility" size={30}/>
        <Text style={styles.contentTxt}>{person?.height} cm</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="barbell" size={30}/>
        <Text style={styles.contentTxt}>{person?.weight} kg</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="mail" size={30}/>
        <Text style={styles.contentTxt}>{person?.email}</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="call" size={30}/>
        <Text style={styles.contentTxt}>{person?.contact}</Text>
      </View>

      <TouchableOpacity style={styles.buttonOut} onPress={()=>router.push("/")}>
          <View style={styles.editStyle}>
            <Ionicons name="log-out" size={20} color={"red"} />
          <Text style={{fontSize:20,color:"red",marginLeft:5, marginTop:-5}}>Log Out</Text>
          </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  content:{
    flexDirection:"row",
    padding: 10,
    alignItems:"center",
  },
  titleTxt:{
    fontSize:28,
    padding: 10, 
  },
  button:{
    marginTop:7,
    marginLeft:120,
    backgroundColor:Colors.white,
    width: 100,
    height:40,
    borderRadius:10,
    shadowColor: "#333333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editStyle:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:8
  },
  buttonOut:{
    marginTop:7,
    marginLeft:120,
    backgroundColor:Colors.white,
    padding:5,
    width:150,
    borderRadius:10,
    shadowColor: "#333333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom:10,
  },
  contentTxt:{
    marginLeft:5,
    fontSize:20,
    padding:10,
    
  }
})
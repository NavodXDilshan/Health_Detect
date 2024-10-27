import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {router, Stack} from 'expo-router'

export default function ProfileContent() {
  return (
    <View style={styles.contentText}>
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
        <Ionicons name="person-circle-outline" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="calendar" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="barbell" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="mail" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="call" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={30}/>
        <Text>ProfileContent</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={30}/>
        <Text>ProfileContent</Text>
      </View>

      <TouchableOpacity style={styles.buttonOut} onPress={()=>router.push("../profile/editDetails/1")}>
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
})
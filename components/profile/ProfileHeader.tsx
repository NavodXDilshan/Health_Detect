import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'


export default function ProfileHeader() {
  return (
    <>
    <View style={styles.container}>
    <View>
      <Image
          source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male"
          }}
          style={styles.profileImg}
          />
        <TouchableOpacity style={styles.addPicBg}> 
            <Ionicons name="add-circle" size={30} style={styles.addPic} />
        </TouchableOpacity>
          <Text style={styles.imageTxt}>Navod Dilshan</Text>
    </View>
    <View style={styles.headerIcons}>
        <TouchableOpacity>
        <View style={styles.iconCards}>
            <Ionicons name='water' size={28} color={"#318CE7"}/>
            <Text style={{paddingLeft:10}}>2L/day</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.iconCards}>
            <Ionicons name='flame' size={28} color={"red"}/>
            <Text style={{paddingLeft:10}}>450kcal/day</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.iconCards}>
            <Ionicons name='scale' size={28} color={"black"}/>
            <Text style={{paddingLeft:10}}>78 BMI</Text>
        </View>
        </TouchableOpacity>
    </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  profileImg:{
    width:150,
    height:150,
    borderRadius:100,
    borderWidth:5,
    borderStyle:"dashed",
    borderColor:Colors.primaryBlue,
    zIndex: 2,
  },
  imageTxt:{
    fontSize:25,
    fontWeight:'300',
  },
  container:{
    flexDirection:"row",
    zIndex: 1,
  },
  headerIcons:{
    flex:1,
    padding:10,
    justifyContent:"center",
    marginLeft:30,
  },
  iconCards:{
    flexDirection:"row",
    alignItems:"center",
    padding:5,
    width:150,
    borderRadius:10,
    backgroundColor:Colors.white,
    shadowColor: "#333333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom:10,
  },
  addPicBg: {
    position: "absolute",
    backgroundColor: Colors.white,
    bottom: 30, 
    right: 0, 
    padding: 2,
    borderRadius: 100,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#333333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addPic: {
    color: Colors.primaryBlue, 
  },


})
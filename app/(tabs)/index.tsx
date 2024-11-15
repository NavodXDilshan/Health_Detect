import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput, Button } from 'react-native';
import React from 'react'
import {router, Stack} from 'expo-router'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Colors from '@/constants/Colors'



export default function index() {
  return (
    <View style={styles.paneContainer}>
    <ImageBackground source={require("../../assets/images/bg.jpg")} style={styles.bgImg} />
    <Stack.Screen options={{
        headerTransparent: true,
        headerTitle:"",
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/profile/1")} style={{marginLeft:20}}>
                <Image
                source={{
                    uri: "https://xsgames.co/randomusers/avatar.php?g=male"
                }}
                style={{width: 40, height: 40, borderRadius: 10}}
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
            }}>
        <Ionicons name="notifications" size={20} color={Colors.black} />
      </TouchableOpacity>
      )   
    }}/>
    
    <View style={styles.pane}>
      <View>
        <Text style={styles.paneTitle}>Analyze your Symptoms</Text>
        <Text style={styles.title}>Enter your Symptoms</Text>
        <TextInput style={styles.textInput} multiline={true}></TextInput>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={{fontSize:20}}>Analyze</Text>
      </TouchableOpacity>
    </View>
    </View>
  
  )
}
const styles = StyleSheet.create({
  bgImg:{
    // width:450,
    height:"100%",
  },
  pane:{
    position:"absolute",
    backgroundColor:Colors.white,
    top:"30%",
    width:"85%",
    alignSelf:"center",
    borderRadius:10,
    padding:10,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  paneContainer:{
    backgroundColor:"green"
  },
  textInput:{
    borderWidth:2,
    borderColor:Colors.primaryBlue,
    borderRadius:10,
    padding:10,
    marginTop:10,
    width:"100%",
    height:150,
  },
  button:{
    marginTop:15,
    backgroundColor:Colors.primaryBlue,
    alignSelf:"center",
    borderRadius:10,
    paddingHorizontal:20,
    paddingVertical:10,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  paneTitle:{
    fontSize:30,
    fontWeight:"300",
    marginBottom:15,
  },
  title:{
    fontSize:20,
    padding:5
  },
})
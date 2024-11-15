import { View, Text, StyleSheet, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'
import Colors from '@/constants/Colors'

const SignUp = () => {
  return (
    <>
    <Stack.Screen options={{
      headerTransparent:true,
      headerTitle:""
    }}/>
      <View style={styles.loginImageContainer}>
      <ImageBackground 
          source={require('../../assets/images/doc.jpg')} 
          style={styles.loginImg}
          blurRadius={10}/>

        <View style={styles.pane}>
            <Text style={styles.titleText}>SignUp</Text>
            <View style={styles.textArea}>
            <View style={styles.inputPackage}>
            <Text style={styles.textStyle}>Name</Text>
            <View style={styles.textInput}>
              <TextInput placeholder='Enter your name'></TextInput>
            </View>
          </View>
          <View style={styles.inputPackage}>
            <Text style={styles.textStyle}>Email</Text>
            <View style={styles.textInput}>
              <TextInput placeholder='abc@gmail.com'></TextInput>
            </View>
          </View>
          <View style={styles.inputPackage}>
            <Text style={styles.textStyle}>Password</Text>
            <View style={styles.textInput}>
              <TextInput secureTextEntry={true} ></TextInput>
            </View>
          </View>
          <View style={styles.inputPackage}>
            <Text style={styles.textStyle}>Confirm Password</Text>
            <View style={styles.textInput}>
              <TextInput secureTextEntry={true} ></TextInput>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text>Sign-Up</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default SignUp

const styles = StyleSheet.create({
  loginImageContainer:{
    flex:1,
    backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
  },
  loginImg:{
    position:"absolute",
    width:420,
    height:950,
  },
  pane:{
    padding:15,
    borderWidth:0,
    width:"80%",
    borderRadius:10,
    backgroundColor:Colors.primaryBlue,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  textInput:{
    padding: 10,
    borderColor:Colors.primaryBlue,
    borderWidth:3,
    backgroundColor:Colors.white,
    borderRadius:10,
  },
  titleText:{
    fontSize:30,
    fontWeight:"300",
  },
  textArea:{
    padding:10,
  },
  textStyle:{
    fontSize:20,
    color:Colors.black,
  },
  inputPackage:{
    marginBottom:5
  },
  button:{
    alignSelf:"center",
    marginTop:10,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    padding:10,
    width:100,
    backgroundColor:Colors.white,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  }



})
import { View, Text, StyleSheet, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import {router, Stack, Link} from 'expo-router'
import Colors from '@/constants/Colors'

const index = () => {
  return (
    <>
    <Stack.Screen options={{
      headerTransparent:true,
      headerTitle:""
    }}/>
    
      <View style={styles.loginImageContainer}>
      <ImageBackground 
          source={require('../assets/images/signIn.jpg')} 
          style={styles.loginImg}
          blurRadius={10}/>

        <View style={styles.pane}>
            <Text style={styles.titleText}>SignIn</Text>
            <View style={styles.textArea}>
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
          <TouchableOpacity style={styles.button} onPress={()=>router.push("/(tabs)")}>
            <Text>Sign-In</Text>
          </TouchableOpacity>
          <View style={styles.linkTxt}>
            <Text style={{fontSize:15}}>Dont't have an account?</Text>
            <Link href={"/login/SignUp"} style={{color:"blue", fontSize:15}}>  Sign-In from here</Link>
          </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default index

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
  },
  linkTxt:{
    flexDirection:"row",
    justifyContent:"center",
    top:10,
  }
})
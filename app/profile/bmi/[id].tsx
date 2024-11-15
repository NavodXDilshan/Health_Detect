import { View, Text, TouchableOpacity,Image, StyleSheet,TextInput, ImageBackground } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Font from 'expo-font';

const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  function calculate() {
    const heightInMeters = parseFloat(height)/100;
    const weightInKilo = parseFloat(weight);
    if(!isNaN(heightInMeters) && !isNaN(weightInKilo) && heightInMeters>0 && weightInKilo>0) {
      setBmi(weightInKilo/(heightInMeters*heightInMeters));
      console.log(bmi);
    }else {
      alert("Enter valid values for the fields");
    }

    setHeight("");
    setWeight('');
  } 
  return (
    <>
      <Stack.Screen
        options={{
        headerTransparent: true,
        headerTitle: '',
    }} />
    <ImageBackground source={require("../../../assets/images/bg.jpg")} style={styles.bgImg}>
    <View style={styles.container}>
      <View style={styles.box}> 
        <Text style={styles.text}>Find out your BMI!</Text>
        <View style={styles.textBoxGroup}>
          <Text>Height : </Text>
          <TextInput style={styles.textInput} value={height}  onChangeText={(text) => setHeight(text)}></TextInput>
          <Text>cm</Text>
        </View>
        <View style={styles.textBoxGroup}>
          <Text>Weight : </Text>
          <TextInput style={styles.textInput} value={weight}  onChangeText={(text) => setWeight(text)}></TextInput>
          <Text>kg</Text>
        </View>
        <TouchableOpacity onPress={(calculate)}>
          <View style={styles.btn}>
            <Text>Calculate</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
    </ImageBackground>
    </>

  )
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  alignItems:"center",
  justifyContent:"center",


 },
 box:{
  backgroundColor:Colors.primaryBlue,
  padding:20,
  borderRadius:10,
  shadowColor: "#333333",
  shadowOffset: {width:1, height: 1},
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  borderColor:Colors.white,
  borderWidth:3,
 },
 text:{
  fontSize:20,
  fontWeight:"300",
  fontFamily:"sans-serif",
  alignSelf:"center",
 },
 textBoxGroup:{
  flexDirection:"row",
  alignItems:"center",
  // justifyContent:"space-around",
  margin:20,
 },
 textInput:{
  borderColor:Colors.black,
  backgroundColor:Colors.white,
  borderWidth:2,
  borderRadius:10,
  padding:10,
  margin:5,
  left:30,
  width:"50%",
 },
 btn:{
  backgroundColor:Colors.white,
  padding:10,
  borderRadius:10,
  shadowColor: "#333333",
  shadowOffset: {width:1, height: 1},
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
  justifyContent:"center",
  alignItems:"center",
  alignSelf:"center",
  width:"50%",

 },
 bgImg:{
  height:"100%",
  
}
})
export default Bmi
import { View, Text, TouchableOpacity,Image, StyleSheet,TextInput, ImageBackground } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as Font from 'expo-font';
import Svg, { Circle, G } from 'react-native-svg';
import ProgressPieChart from '../waterIntake/ProgressPieChart';


const Bmi = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  function increaseProgress(){
        setProgress(progress+0.1);
  }

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
        <ProgressPieChart progress={progress} />

        <TouchableOpacity onPress={increaseProgress}>
            <View style={styles.btn}>
                <Ionicons name="water" size={35} color={Colors.primaryBlue}/>
                <Text style={styles.text}>One Cup</Text>
            </View>
        </TouchableOpacity>
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
  padding:10,
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
//   justifyContent:"center",
  alignItems:"center",
//   alignSelf:"center",
  width:"50%",
  margin:40,
  flexDirection:"row",

 },
 bgImg:{
  height:"100%",
  
}
})
export default Bmi
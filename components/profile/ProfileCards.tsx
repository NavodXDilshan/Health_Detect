import { View, Text, ScrollView,Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { router } from 'expo-router'

export default function ProfileCards() {
  return (
    <View>
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
      gap:10,
    }}>
    <TouchableOpacity onPress={()=>router.push("../profile/bmi/1")}>
      <View style={styles.card}>
        <Image 
          source={require('../../assets/images/bmi.webp')}
            style={styles.cardImg}/>
        <Text style={styles.cardImageTxt}>Check your BMI here!</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>router.push("../profile/waterIntake/1")}>
      <View style={styles.card}>
        <Image 
          source={require('../../assets/images/water.jpeg')}
            style={styles.cardImg}/>
        <Text style={styles.cardImageTxt}>Track your water intake for the day!</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>router.push("../profile/calories/1")}>
      <View style={styles.card}>
        <Image 
          source={require('../../assets/images/lifestyle.jpg')}
            style={styles.cardImg}/>
        <Text style={styles.cardImageTxt}>Burn your calories</Text>
      </View>
    </TouchableOpacity>
    </ScrollView>
  </View>
  )
}
const styles = StyleSheet.create({
    cardArea:{
      flex:1.3,
      // backgroundColor:"green",
      alignItems:'center',
      justifyContent:"center",
    },
    card:{
      alignItems:'center',
      padding:15,
      backgroundColor:Colors.primaryBlue,
      borderRadius:10,
      marginRight:10,
    },
    cardImg:{
      width:280,
      height:150,
      borderRadius:10,
    },
    cardImageTxt:{
      marginTop:5,
      fontSize:16,
    }
  })
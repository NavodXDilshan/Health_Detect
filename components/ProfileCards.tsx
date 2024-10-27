import { View, Text, ScrollView,Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

export default function ProfileCards() {
  return (
    <View>
    <ScrollView horizontal
    contentContainerStyle={{
      gap:10,
    }}>
    <TouchableOpacity>
      <View style={styles.card}>
        <Image 
          source={{
            uri:"https://d2jx2rerrg6sh3.cloudfront.net/image-handler/ts/20220531061855/ri/750/src/images/Article_Images/ImageForArticle_22595_16539923345862310.jpg"
            }}
            style={styles.cardImg}/>
        <Text style={styles.cardImageTxt}>Check your BMI here!</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity>
      <View style={styles.card}>
        <Image 
          source={require('../assets/images/water.jpeg')}
            style={styles.cardImg}/>
        <Text style={styles.cardImageTxt}>Check your BMI here!</Text>
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
      backgroundColor:Colors.primaryColor,
      borderRadius:10,
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
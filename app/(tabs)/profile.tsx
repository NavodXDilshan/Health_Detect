import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'
import Colors from '@/constants/Colors'
import ProfileCards from '@/components/ProfileCards'

export default function profile() {
  return (
    <>
    <Stack.Screen options = {{
      headerTransparent:true,
      headerTitle:"",
    }} />

    <View style={styles.container}>
      <View style={styles.imageArea}>
      <Image
          source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male"
          }}
          style={styles.profileImg}
          />
          <Text style={styles.imageTxt}>Navod Dilshan</Text>
      </View>
      <View style={styles.cardArea}>

      </View>
      <View style={styles.contentArea}>
      </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  profileImg:{
    width:150,
    height:150,
    borderRadius:100,
    borderWidth:5,
    borderColor:"purple"
  },
  imageArea:{
    flex:1.5,
    // backgroundColor:"blue",
    justifyContent:"center",
    alignItems:"center",
  },
  cardArea:{
    flex:1.3,
    // backgroundColor:"green",
    alignItems:'center',
    justifyContent:"center",
  },
  contentArea:{
    flex:2,
    backgroundColor:"orange",
  },
  imageTxt:{
    fontSize:25,
    fontWeight:'300',
  },

})
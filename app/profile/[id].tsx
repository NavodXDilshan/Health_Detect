import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'
import Colors from '@/constants/Colors'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileCards from '@/components/profile/ProfileCards'
import ProfileContent from '@/components/profile/ProfileContent'

export default function profile() {
  return (
    <>
    <Stack.Screen options = {{
      headerTransparent:true,
      headerTitle:"",
    }} />

    <View style={styles.container}>
      <View style={styles.imageArea}>
        <ProfileHeader />
      </View>
      <ScrollView style={{ height: 400 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.cardArea}>
          <ProfileCards />
      </View>
      <View style={styles.contentArea}>
        <ProfileContent />
      </View>
      </ScrollView>
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
    borderColor:Colors.primaryBlue
  },
  imageArea:{
    flex:1.5,
    // backgroundColor:"blue",
    justifyContent:"center",
    alignItems:"flex-start",
    marginLeft:20,
    marginTop:20,
  },
  cardArea:{
    flex:1.3,
    // backgroundColor:"green",
    alignItems:'center',
    justifyContent:"center",
  },
  contentArea:{
    flex:2,
    // backgroundColor:"orange",
  },
  imageTxt:{
    fontSize:25,
    fontWeight:'300',
  },

})
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'

export default function profile() {
  return (
    <>
    <Stack.Screen options = {{
      headerTransparent:true,
      headerTitle:"",
    }} />

    <View>
      <View>
      <Image
          source={{
              uri: "https://xsgames.co/randomusers/avatar.php?g=male"
          }}
          style={styles.profileImg}
          />
      </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  profileImg:{
    width:40,
    height:40,
    borderRadius:10
  }
})
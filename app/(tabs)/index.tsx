import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {router, Stack} from 'expo-router'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Colors from '@/constants/Colors'


export default function index() {
  return (
    <>
    <Stack.Screen options={{
        headerTransparent: true,
        headerTitle:"",
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("./profile/1")} style={{marginLeft:20}}>
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
    <View>
    </View>
    </>
  )
}
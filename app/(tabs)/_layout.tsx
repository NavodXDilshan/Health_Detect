import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Colors from '@/constants/Colors'

export default function Layout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: {
            backgroundColor:Colors.bgColor,
            borderTopWidth: 0,
            padding:0
        },
        tabBarShowLabel:false,
        tabBarActiveTintColor:Colors.black,
        tabBarInactiveTintColor:'#999',
        }}>
        <Tabs.Screen name='index' options={{tabBarIcon: ({color}) => (
            <Ionicons name='analytics-sharp' size={28} color={color} />
        )}}/>
        <Tabs.Screen name='chatbot' options={{tabBarIcon: ({color}) => (
            <Ionicons name="chatbubble-ellipses-sharp" size={28} color={color} />
        )}}/>
        <Tabs.Screen name='feed' options={{tabBarIcon: ({color}) => (
            <View 
                style={styles.tabStyle}>
            <Ionicons name='planet-sharp' size={28} color={color} /></View>
        )}} />
        <Tabs.Screen name='connect' options={{tabBarIcon: ({color}) => (
            <Ionicons name='medkit-sharp' size={28} color={color} />
        )}} />
        <Tabs.Screen name='map' options={{tabBarIcon: ({color}) => (
            <FontAwesome name='map' size={28} color={color} />
        )}} />
    </Tabs>
  )}

  const styles = StyleSheet.create({
    tabStyle:{
        backgroundColor:Colors.primaryColor,
        paddingHorizontal:16,
        paddingVertical:12,
        borderRadius:10,
        height:50
    },
  })

import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'


export default function EditDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Edit Details</Text>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.subTitle}>User Details</Text>
        <View style={styles.inputWrapper}>
          <Text>Name    :</Text>
          <View style={styles.inputBar}>
            <TextInput placeholder='Enter Name...'/>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text>Age      :</Text>
          <View style={styles.inputBar}>
            <TextInput placeholder='Enter Name...'/>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text>Gender :</Text>
          <View style={styles.inputBar}>
            <TextInput placeholder='Enter Name...'/>
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.subTitle}>Physique Details</Text>
        <View style={styles.inputGroupRow}>
        <View style={styles.inputWrapper}>
          <Text>Height :</Text>
          <View style={styles.inputBarRow}>
            <TextInput placeholder='Enter Name...'/> 
          </View>
          <Text> cm</Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text>Weight :</Text>
          <View style={styles.inputBarRow}>
            <TextInput placeholder='Enter Name...'/>
          </View>
          <Text> kg</Text>
        </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.subTitle}>Contact Details</Text>
        <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <Ionicons name="call" size={20}/>
          <View style={styles.inputBar}>
            <TextInput placeholder='Contact No'/> 
          </View>
        </View>
        <View style={styles.inputWrapper}>
        <Ionicons name="mail" size={20}/>
          <View style={styles.inputBar}>
            <TextInput placeholder='Email'/>
          </View>
        </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={{color:Colors.white, fontSize:20, fontWeight:"500"}}>Confirm</Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title:{
    fontSize:30,
    fontWeight:"300",
  },
  titleContainer:{
    alignItems:"center",
    padding:10,
  },
  inputWrapper:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft: 10,
    marginTop:10,
  },
  inputBodyWrapper:{
    flexDirection:"row",
    alignItems:"center",
    marginLeft: 0,
    marginTop:10,
  },
  inputBar:{
    backgroundColor:Colors.white,
    width: 200,
    padding:5,
    borderRadius:10,
    borderWidth:2,
    borderColor:Colors.primaryBlue,
    marginLeft:10,
  },
  inputBarRow:{
    backgroundColor:Colors.white,
    width: 100,
    padding:5,
    borderRadius:10,
    borderWidth:2,
    borderColor:Colors.primaryBlue,
    marginLeft:10,
  },
  inputGroup:{
    padding:5,
    marginTop:5,
  },
  inputGroupRow:{
    padding:5,
    marginTop:5,
    flexDirection:"row"
  },
  subTitle:{
    fontSize:20,
    fontWeight:"500",
  },
  button:{
    backgroundColor: Colors.primaryBlue,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#333333",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3, 
    alignItems: "center",
    width: 200,
  },
  buttonContainer:{
    alignItems: "center",
    padding: 10,
  }

})
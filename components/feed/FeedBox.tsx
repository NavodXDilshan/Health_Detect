import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, Modal } from 'react-native'
import React,{useState} from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

interface PersonData {
    name: string;
    content:string;
  }
export default function FeedBox({ person }: { person: PersonData }) {
    const [react, setReact] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const handlereact = ()=>{
        setReact(!react);
    }
    const openModal=()=>{
        setModalVisible(true);
    }
    const closeModal=()=>{
        setModalVisible(false);
    }
  return (
    <View style={styles.container}>
      <View style={styles.feedBox}>
        <View style={styles.feedHeader}>
        <Image
            source={{
                uri: "https://xsgames.co/randomusers/avatar.php?g=male"
            }}
            style={{width: 40, height: 40, borderRadius: 100, borderWidth:2, borderColor:Colors.primaryBlue}}
            />
           <Text>{person.name}</Text>
        </View>
        <View style={styles.feedContent}>
            <Text style={styles.textStyle}>
                    {person.content}
            </Text>
        </View>
        <View style={styles.feedFooter}>
            <TouchableOpacity onPress={handlereact}>
                <Ionicons name={react?"heart":"heart-outline"} size={25} color={"#EB3678"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal} 
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalText}>Place Your Reply</Text>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <TextInput placeholder='Type your reply...' style={styles.txtInput} multiline={true}>

                            </TextInput>
                            <TouchableOpacity style={styles.sendBtn} >
                                <Ionicons name={"send"} size={20} color={"white"}/>  
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
                <Ionicons name={"chatbubble"} size={25}/>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
container :{
    flex:1,
    marginTop:10,
    // backgroundColor:"blue"
},
feedBox:{
    backgroundColor:"white",
    width: "95%",
    borderRadius:10,
    alignSelf:"center",
    // padding:10,
    shadowColor: "#333",
    shadowOffset: {width:1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
},
feedHeader:{
    gap:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start",
    padding:10
},
feedContent:{
    margin:5,
    padding: 10,
    borderWidth:2,
    borderColor:Colors.primaryBlue,
    borderRadius:10,
},
textStyle:{
    fontSize:15,
    fontWeight:"300"
},
feedFooter:{
    flexDirection:"row",
    justifyContent:"space-around",
    padding:10,

},
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
},
modalText: {
    fontSize: 18,
    marginBottom: 15,
},
modalFooter: {
    flexDirection: "row",
    alignItems: "center", 
    paddingVertical: 10,  
    paddingHorizontal: 10, 
    borderRadius: 10,
    width: '100%',
},
txtInput: {
    flex: 1, 
    borderColor: Colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "center", 
},
sendBtn: {
    marginLeft: 10, 
    padding: 10,
    backgroundColor: Colors.primaryBlue,
    borderRadius: 5,
    shadowColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
},


}) 
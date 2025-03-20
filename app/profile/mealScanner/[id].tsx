// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   ImageBackground,
// } from 'react-native';
// import { Camera } from 'expo-camera';
// import axios from 'axios';
// import { Stack } from 'expo-router';
// import Colors from '@/constants/Colors';

// const MealScanner = () => {
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const [cameraRef, setCameraRef] = useState<Camera | null>(null);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [calories, setCalories] = useState<number | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Request camera permission
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   // Take a photo
//   const takePicture = async () => {
//     if (cameraRef) {
//       const photoData = await cameraRef.takePictureAsync({ base64: true });
//       setPhoto(photoData.uri);
//       estimateCalories(photoData.base64); // Pass base64 for API
//     }
//   };

//   // Estimate calories using an API
//   const estimateCalories = async (base64Image: string | undefined) => {
//     try {
//       // Step 1: Use Google Cloud Vision API for food detection (example)
//       const visionResponse = await axios.post(
//         `https://vision.googleapis.com/v1/images:annotate?key=YOUR_GOOGLE_API_KEY`,
//         {
//           requests: [
//             {
//               image: { content: base64Image },
//               features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
//             },
//           ],
//         }
//       );

//       const labels = visionResponse.data.responses[0].labelAnnotations;
//       const foodItem = labels?.[0]?.description || 'unknown food'; // e.g., "pizza"

//       // Step 2: Use Edamam API for nutrition data
//       const edamamResponse = await axios.get(
//         `https://api.edamam.com/api/nutrition-data?app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY&ingr=${encodeURIComponent(
//           `1 serving ${foodItem}`
//         )}`
//       );

//       const calories = edamamResponse.data.calories || 0;
//       setCalories(calories);
//       setModalVisible(true);
//     } catch (error) {
//       console.error('Error estimating calories:', error);
//       setCalories(0); // Fallback
//       setModalVisible(true);
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <>
//       <Stack.Screen options={{ headerTransparent: true, headerTitle: '' }} />
//       <ImageBackground source={require('../../../assets/images/bg.jpg')} style={styles.bgImg}>
//         <View style={styles.container}>
//           {!photo ? (
//             <Camera
//               style={styles.camera}
//               ref={(ref) => setCameraRef(ref)}
//               type={Camera.Constants.Type.back}
//             >
//               <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//                 <Text style={styles.captureText}>Take Photo</Text>
//               </TouchableOpacity>
//             </Camera>
//           ) : (
//             <Image source={{ uri: photo }} style={styles.preview} />
//           )}
//           {photo && (
//             <TouchableOpacity
//               style={styles.retakeButton}
//               onPress={() => setPhoto(null)}
//             >
//               <Text style={styles.buttonText}>Retake</Text>
//             </TouchableOpacity>
//           )}

//           {/* Result Modal */}
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={modalVisible}
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContainer}>
//                 <Text style={styles.modalTitle}>Calorie Estimate</Text>
//                 <Text style={styles.modalText}>
//                   Estimated Calories: {calories?.toFixed(0) || 0} cal
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </View>
//       </ImageBackground>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bgImg: {
//     height: '100%',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   captureButton: {
//     backgroundColor: Colors.primaryBlue,
//     padding: 15,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   captureText: {
//     color: Colors.white,
//     fontSize: 18,
//   },
//   preview: {
//     width: '100%',
//     height: '80%',
//     resizeMode: 'contain',
//   },
//   retakeButton: {
//     backgroundColor: Colors.primaryBlue,
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: Colors.white,
//     fontSize: 16,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: Colors.white,
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   closeButton: {
//     backgroundColor: Colors.primaryBlue,
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   closeButtonText: {
//     color: Colors.white,
//     fontSize: 16,
//   },
// });

// export default MealScanner;
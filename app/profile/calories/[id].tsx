import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

const Calories = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: string | null }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [totalCalories, setTotalCalories] = useState<number | null>(null);

  const data = [
    { animation: require('../../../assets/gifs/jog.json'), label: 'Jogging', rates: [7, 10, 12, 14] },
    { animation: require('../../../assets/gifs/run.json'), label: 'Running', rates: [10, 12, 15, 18] },
    { animation: require('../../../assets/gifs/cycling.json'), label: 'Cycling', rates: [5, 8, 10, 12] },
    { animation: require('../../../assets/gifs/pushups.json'), label: 'Pushups', rates: [6, 8, 10, 12] },
    { animation: require('../../../assets/gifs/squat.json'), label: 'Squats', rates: [5, 7, 9, 11] },
    { animation: require('../../../assets/gifs/jumprope.json'), label: 'Jump Rope', rates: [10, 12, 14, 16] },
    { animation: require('../../../assets/gifs/weight.json'), label: 'Weight Lifting', rates: [4, 6, 8, 10] },
  ];

  const items = [
    { label: 'No', value: 'low' },
    { label: '0 - 30 min', value: 'medium' },
    { label: '30 - 1 hour', value: 'high' },
    { label: 'More than 1 hour', value: 'highest' },
  ];

  const durations = {
    low: 0,
    medium: 15,
    high: 45,
    highest: 75,
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleValueChange = (index: number) => (callback: (prevValue: string | null) => string | null) => {
    setSelectedValues((prev) => {
      const newValue = callback(prev[index]);
      const newValues = { ...prev, [index]: newValue };
      console.log('Selected Values:', newValues); // Debug log
      return newValues;
    });
  };

  const calculateCalories = () => {
    let total = 0;
    data.forEach((activity, index) => {
      const intensity = selectedValues[index] || 'low'; // Default to 'low' if not selected
      const rateIndex = ['low', 'medium', 'high', 'highest'].indexOf(intensity);
      const rate = activity.rates[rateIndex];


      const duration = durations[intensity as keyof typeof durations];
      total += rate * duration;
    });
    console.log('Total Calories:', total); // Debug log
    setTotalCalories(total);
    setModalVisible(true);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <ImageBackground source={require('../../../assets/images/bg.jpg')} style={styles.bgImg}>
        <View style={styles.container}>
          <Text style={styles.Text}>Select intensity for each activity!</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <LottieView
                  source={item.animation}
                  autoPlay
                  loop
                  style={styles.animation}
                />
                <View style={styles.dropdownContainer}>
                  <DropDownPicker
                    open={openDropdowns[index] || false}
                    value={selectedValues[index] || null}
                    items={items}
                    setOpen={() => toggleDropdown(index)}
                    setValue={handleValueChange(index)} // Corrected setValue
                    setItems={() => {}} // No-op for items
                    placeholder="Select Intensity"
                    dropDownContainerStyle={{
                      maxHeight: 165,
                      zIndex: 1000,
                    }}
                    style={{
                      zIndex: 1000,
                      marginBottom: openDropdowns[index] ? 150 : 0,
                    }}
                    containerStyle={{
                      flex: 1,
                    }}
                  />
                </View>
              </View>
            )}
          />
          <TouchableOpacity onPress={calculateCalories}>
            <View style={styles.btn}>
              <Text style={{ fontSize: 20, fontWeight: '500', color: Colors.white }}>Calculate</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal for Result */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Calories Burned</Text>
              <Text style={styles.modalText}>
                Total: {totalCalories?.toFixed(0) || 0} calories
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImg: {
    height: '100%',
  },
  Text: {
    marginTop: 100,
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  animation: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.primaryBlue,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#333333',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '50%',
    margin: 40,
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default Calories;
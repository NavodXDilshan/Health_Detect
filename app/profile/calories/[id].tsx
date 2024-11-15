import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import Colors from '@/constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

const Calories = () => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: string | null }>({});

  const data = [
    { animation: require('../../../assets/gifs/jog.json'), label: 'Jogging' },
    { animation: require('../../../assets/gifs/run.json'), label: 'Running' },
    { animation: require('../../../assets/gifs/cycling.json'), label: 'Cycling' },
    { animation: require('../../../assets/gifs/pushups.json'), label: 'Pushups' },
    { animation: require('../../../assets/gifs/squat.json'), label: 'Squats' },
    { animation: require('../../../assets/gifs/jumprope.json'), label: 'Jump Rope' },
    { animation: require('../../../assets/gifs/weight.json'), label: 'Weight Lifting' },
  ];

  const items = [
    { label: 'No', value: 'low' },
    { label: '0 - 30 min', value: 'medium' },
    { label: '30 - 1 hour', value: 'high' },
    { label: 'More than 1 hour', value: 'highest' }
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleValueChange = (index: number, value: string | null) => {
    setSelectedValues((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <ImageBackground source={require("../../../assets/images/bg.jpg")} style={styles.bgImg}>
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
              setValue={(value) => handleValueChange(index, value as unknown as string)}
              setItems={() => {}}
              placeholder="Select Intensity"
              dropDownContainerStyle={{
                maxHeight: 165, // Set maximum height for dropdown
                zIndex: 1000, // Ensure it renders above other elements
              }}
              style={{
                zIndex: 1000, // Ensures dropdown input is above other elements
                marginBottom: openDropdowns[index] ? 150 : 0, // Adds space for dropdown when open
              }}
              containerStyle={{
                flex: 1,
              }}
            />
                </View>
              </View>
            )}
          />
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>Calculate</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginVertical: 15  ,
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
});

export default Calories;

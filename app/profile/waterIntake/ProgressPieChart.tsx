import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Colors from '@/constants/Colors'

interface ProgressPieChartProps {
    progress: number; // Define the type here
  }

const ProgressPieChart: React.FC<ProgressPieChartProps> = ({ progress }) => {
  const radius = 50; // Radius of the circle
  const strokeWidth = 10; // Width of the stroke
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progressStroke = (1 - progress) * circumference; // Adjust the stroke for progress

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 120 120">
        <G rotation="-90" origin="60, 60">
          {/* Background Circle */}
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke={Colors.white} // Background circle color
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx="60"
            cy="60"
            r={radius}
            stroke={Colors.primaryBlue}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference} // Full circumference of the circle
            strokeDashoffset={progressStroke} // Remaining stroke
            fill="none"
          />
        </G>
      </Svg>
      <Text style={styles.progressText}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b5998',
  },
});

export default ProgressPieChart;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

type ParkingItem = {
  id: number;
  title: string;
  location: string;
  price: number;
};

const ParkingsScreen = () => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.parking}>
        <View style={styles.parkingInfo}>
          <Text style={{...styles.text, fontSize: 18}}>{item.title}</Text>
          <Text style={{...styles.text, fontSize: 16, color: COLORS.TEXT_GRAY}}>
            {item.location}
          </Text>
        </View>
        <View style={styles.parkingPrice}>
          <Text style={{...styles.text, fontSize: 18}}>${item.price}</Text>
          <Text style={{...styles.text, fontSize: 16, color: COLORS.TEXT_GRAY}}>
            per hour
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parking Screen</Text>
    </View>
  );
};

export default ParkingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    color: COLORS.TEXT_BLACK,
  },
  parking: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_BLACK,
  },
  parkingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  parkingPrice: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

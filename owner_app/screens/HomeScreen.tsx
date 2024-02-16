import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

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
});

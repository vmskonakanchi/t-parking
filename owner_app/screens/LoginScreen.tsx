import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import {COLORS} from '../constants';
import EditInput from '../components/EditInput';
import MyButton from '../components/MyButton';

const LoginScreen = () => {
  return (
    <ScrollView style={styles.bg}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <EditInput
          label="Enter username"
          onChangeText={console.log}
          autoFocus
        />
        <EditInput
          label="Enter password"
          onChangeText={console.log}
          keyBoardType="password"
        />
        <MyButton title="Submit" onPress={console.log} />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.SECONDARY,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '30%',
  },
  logo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 90,
  },
  container: {
    alignItems: 'center',
    marginTop: '10%',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
  },
});

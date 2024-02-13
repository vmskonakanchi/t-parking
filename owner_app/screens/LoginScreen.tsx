import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {COLORS} from '../constants';
import EditInput from '../components/EditInput';
import MyButton from '../components/MyButton';
import api from '../api/api';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [details, setDetails] = useState({username: '', password: ''});
  const [loading, setLoading] = useState(false);

  const handleChange = (text: string, type: 'username' | 'password') => {
    setDetails({...details, [type]: text});
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/', details);
      setLoading(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>LOGO</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        {loading ? (
          <Loader marginTop={50} />
        ) : (
          <>
            <EditInput
              label="Enter username"
              onChangeText={text => handleChange(text, 'username')}
              autoFocus
            />
            <EditInput
              label="Enter password"
              keyBoardType="password"
              onChangeText={text => handleChange(text, 'password')}
            />
            <MyButton title="Submit" onPress={handleSubmit} />
          </>
        )}
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

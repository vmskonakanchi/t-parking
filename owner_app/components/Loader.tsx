import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

type LoaderProps = {
  marginTop?: number;
};

const Loader = (props: LoaderProps) => {
  return (
    <View style={{...props}}>
      <ActivityIndicator size="large" color={COLORS.WHITE} />
    </View>
  );
};

export default Loader;

import {ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

type LoaderProps = {
  marginTop?: number;
  size?: number;
  color?: string;
};

const Loader = (props: LoaderProps) => {
  return (
    <ActivityIndicator
      shouldRasterizeIOS
      style={{...props, transform: [{scale: props.size || 1.5}]}}
      size="large"
      color={props.color ? props.color : COLORS.TEXT_BLACK}
    />
  );
};

export default Loader;

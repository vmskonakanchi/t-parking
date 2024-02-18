import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZES} from '../constants';

type MyButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const MyButton = (props: MyButtonProps) => {
  const {title, onPress, disabled} = props;

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: disabled ? COLORS.PRIMARY_DISABLED : COLORS.PRIMARY,
      }}
      underlayColor={COLORS.SECONDARY}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    height: 60,
    width: 350,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    textAlign: 'center',
  },
});

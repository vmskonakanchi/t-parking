import {Button, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZES} from '../constants';

type MyButtonProps = {
  title: string;
  onPress: () => void;
};
const MyButton = (props: MyButtonProps) => {
  const {title, onPress} = props;

  return (
    <View>
      <TouchableHighlight
        onPress={onPress}
        style={styles.button}
        underlayColor={COLORS.TEXT}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    margin: 20,
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

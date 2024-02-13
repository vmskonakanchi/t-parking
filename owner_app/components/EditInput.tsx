import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZES} from '../constants';

type EditInputProps = {
  label: string;
  value?: string;
  onChangeText: (text: string) => void;
  keyBoardType?: 'default' | 'password';
  autoFocus?: boolean;
};

const EditInput = (props: EditInputProps) => {
  const {label, value, onChangeText, keyBoardType, autoFocus} = props;

  return (
    <View>
      <TextInput
        placeholder={label}
        style={styles.inputStyles}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.LIGHT_BLACK}
        secureTextEntry={keyBoardType === 'password'}
        autoFocus={autoFocus || false}
      />
    </View>
  );
};

export default EditInput;

const styles = StyleSheet.create({
  inputStyles: {
    color: COLORS.TEXT_BLACK,
    fontFamily: 'Poppins-Regular',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: FONT_SIZES.MEDIUM,
    width: 350,
    padding: 15,
    marginVertical: 10,
  },
});

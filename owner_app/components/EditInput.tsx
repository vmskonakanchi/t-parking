import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS, FONT_SIZES} from '../constants';

type EditInputProps = {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyBoardType?: KeyboardTypeOptions;
  autoFocus?: boolean;
  canEdit?: boolean;
  secureTextEntry?: boolean;
  maxLength?: number;
};

const EditInput = (props: EditInputProps) => {
  const {
    label,
    value,
    onChangeText,
    keyBoardType,
    autoFocus,
    canEdit,
    secureTextEntry,
  } = props;

  return (
    <TextInput
      {...props}
      placeholder={label}
      style={{
        ...styles.inputStyles,
        color: canEdit ? COLORS.TEXT_BLACK : COLORS.LIGHT_BLACK,
      }}
      value={value || undefined}
      editable={canEdit}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.LIGHT_BLACK}
      secureTextEntry={secureTextEntry}
      keyboardType={keyBoardType}
      autoFocus={autoFocus || false}
    />
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
    height: Dimensions.get('window').height / 11,
    width: Dimensions.get('window').width * 0.9,
    padding: 15,
    marginVertical: 10,
  },
});

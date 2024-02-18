import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';
import React, {useState} from 'react';
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
  validate?: (text: string) => boolean;
  validateMessage?: string;
};

const EditInput = (props: EditInputProps) => {
  const [isError, setIsError] = useState(false);
  const {
    label,
    value,
    onChangeText,
    keyBoardType,
    autoFocus,
    canEdit,
    secureTextEntry,
    validate,
    validateMessage,
  } = props;

  return (
    <>
      <TextInput
        {...props}
        placeholder={label}
        style={{
          ...styles.inputStyles,
          color: canEdit ? COLORS.TEXT_BLACK : COLORS.LIGHT_BLACK,
        }}
        value={value || undefined}
        editable={canEdit}
        onChangeText={text => {
          if (validate) {
            setIsError(!validate(text));
          }
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        placeholderTextColor={COLORS.LIGHT_BLACK}
        secureTextEntry={secureTextEntry}
        keyboardType={keyBoardType}
        autoFocus={autoFocus || false}
      />
      {isError && (
        <Text style={{color: COLORS.RED, fontSize: FONT_SIZES.SMALL}}>
          {validateMessage || 'Invalid input'}
        </Text>
      )}
    </>
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

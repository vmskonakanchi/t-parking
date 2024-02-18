import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

type SingleDropDownItem = {
  label: string;
  value: string;
};

type DropDownProps = {
  label: string;
  data: Array<SingleDropDownItem>;
  onSelect: (item: SingleDropDownItem) => void;
};

const Dropdown = (props: DropDownProps) => {
  return (
    <View>
      <Text style={styles.text}>Dropdown</Text>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    color: COLORS.TEXT_BLACK,
  },
});

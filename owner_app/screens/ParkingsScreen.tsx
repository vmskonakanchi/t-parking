import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import Dropdown from "../components/Dropdown";

type ParkingItem = {
  id: number;
  title: string;
  location: string;
  price: number;
};

const ParkingsScreen = () => {

  return (
    <View style={styles.container}>
      <Dropdown />
      <Dropdown />
    </View>
  );
};

export default ParkingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    color: COLORS.TEXT_BLACK,
  },
  parking: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.TEXT_BLACK,
  },
  parkingInfo: {
    flex: 1,
    justifyContent: "center",
  },
  parkingPrice: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

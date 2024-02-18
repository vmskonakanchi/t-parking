import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SCREEN_NAMES } from "../constants";
import EditInput from "../components/EditInput";
import MyButton from "../components/MyButton";
import api from "../api/api";
import Loader from "../components/Loader";
import Toast from "react-native-root-toast";
import { useMMKVStorage } from "react-native-mmkv-storage";
import storage from "../storage/storage";
import { LoginUser } from "../storage/types";
import useStorage from "../storage/storage";

type InputName = "username" | "password";

const defaultUser: LoginUser = {
  username: "",
  password: "",
  client_id: "",
};

const loginDetails = {
  username: "vamsi@ymtsindia.in",
  password: "La8370",
};

const LoginScreen = ({ navigation }: any) => {
  const [details, setDetails] = useState(loginDetails);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useStorage("user", defaultUser);

  const handleChange = (text: string, type: InputName) => {
    setDetails({ ...details, [type]: text });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/users/login", details);
      if (data.isOwner === 0) { // checking the user is owner or not
        Toast.show(
          "You are not authorized to access this application , please login as owner",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: COLORS.RED,
          }
        );
        setLoading(false);
        return;
      }
      setUser({
        ...user,
        username: details.username,
        client_id: data.clientId,
      });
      setLoading(false);
      Toast.show(data.msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.PRIMARY,
      });
      navigation.navigate(SCREEN_NAMES.MAIN_NAV);
    } catch (error: any) {
      Toast.show(error?.response?.data?.msg || error.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: COLORS.RED,
      });
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
              value={details.username}
              onChangeText={(text) => handleChange(text, "username")}
              validate={(text) => text.includes("@")}
              validateMessage="Username must contain @ symbol"
              autoFocus
            />
            <EditInput
              label="Enter password"
              secureTextEntry={true}
              value={details.password}
              onChangeText={(text) => handleChange(text, "password")}
              validate={(text) => text.length > 5}
              validateMessage="Password must be at least 6 characters"
            />
            <MyButton
              title="Submit"
              onPress={handleSubmit}
              disabled={
                !details.username ||
                !details.password ||
                details.password.length < 6 ||
                !details.username.includes("@")
              }
            />
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
    alignItems: "center",
    marginTop: "30%",
  },
  logo: {
    fontFamily: "Poppins-Regular",
    fontSize: 90,
  },
  container: {
    alignItems: "center",
    marginTop: "10%",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
  },
});

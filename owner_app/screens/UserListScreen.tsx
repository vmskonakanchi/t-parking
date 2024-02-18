import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants";
import api from "../api/api";
import Loader from "../components/Loader";
import Icon from "react-native-vector-icons/MaterialIcons";
import EditInput from "../components/EditInput";
import MyButton from "../components/MyButton";
import Toast from "react-native-root-toast";
import { useMMKVStorage } from "react-native-mmkv-storage";
import storage from "../storage/storage";
import { LoginUser } from "../storage/types";
import useStorage from "../storage/storage";

type UserItem = {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
};

const UserListScreen = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [user] = useStorage<LoginUser>("user");

  const renderItem = ({ item }: { item: UserItem }) => {
    return (
      <View style={styles.userContainer}>
        <Text style={styles.userText}>{item.name}</Text>
        <Text style={styles.userText}>{item.email}</Text>
        <Text style={styles.userText}>{item.phone}</Text>
      </View>
    );
  };

  const getUsers = async () => {
    try {
      if (!user) {
        return console.log("Client id not found");
      }
      const { data } = await api.get(
        `/users/filter?client_id=${user.client_id}`
      );
      setUsers(data);
    } catch (error: any) {
      Toast.show(error?.response?.data?.msg || error.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.RED,
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Loader
          marginTop={Dimensions.get("window").height / 2}
          color={COLORS.WHITE}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCreateUser ? (
        <CreateUser
          setLoading={setLoading}
          setUsers={setUsers}
          users={users}
          clientId={user?.client_id}
          setCreateUser={setIsCreateUser}
        />
      ) : (
        <FlatList
          data={users}
          style={styles.listContainer}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableHighlight
        style={styles.addFab}
        underlayColor={COLORS.SECONDARY}
        onPress={() => setIsCreateUser(!isCreateUser)}
      >
        <Icon
          name={isCreateUser ? "arrow-back" : "add"}
          color={COLORS.WHITE}
          size={40}
        />
      </TouchableHighlight>
    </View>
  );
};

type CreateUserProps = {
  setLoading: (loading: boolean) => void;
  setUsers: (users: UserItem[]) => void;
  users: UserItem[];
  setCreateUser: (createUser: boolean) => void;
  clientId?: number;
};

const CreateUser = (props: CreateUserProps) => {
  const { setLoading, setUsers, users, setCreateUser, clientId } = props;

  const [details, setDetails] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    client_id: clientId,
  });

  const handleChange = (value: string, name: string) => {
    setDetails({ ...details, [name]: value });
  };

  const addUser = async () => {
    try {
      setLoading(true);
      details.username = details.email;
      details.password =
        details.name.substring(0, 2) + details.phone.substring(6, 10);
      const { data } = await api.post("/users/", details);
      details.id = users.length + 1 + "";
      setUsers([...users, details]);
      setLoading(false);
      Toast.show(data.msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.PRIMARY,
      });
      setCreateUser(false);
    } catch (error: any) {
      setLoading(false);
      Toast.show(error.response?.data?.msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.RED,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.createUserView}>
        <EditInput
          label="Enter name"
          onChangeText={(text) => handleChange(text, "name")}
          validate={(text) => text.length > 0}
          validateMessage="Name is required"
        />
        <EditInput
          label="Enter phone"
          maxLength={10}
          keyBoardType="phone-pad"
          validate={(text) => text.length === 10}
          validateMessage="Phone number should be 10 digits"
          onChangeText={(text) => handleChange(text, "phone")}
        />
        <EditInput
          label="Enter email"
          keyBoardType="email-address"
          onChangeText={(text) => handleChange(text, "email")}
          validate={(text) => text.includes("@")}
          validateMessage='Email should contain "@"'
        />
        <MyButton
          title="Create User"
          onPress={addUser}
          disabled={!details.name || !details.phone || !details.email}
        />
      </View>
    </ScrollView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SECONDARY,
  },
  listContainer: {
    marginTop: Dimensions.get("window").height / 20,
  },
  userContainer: {
    width: Dimensions.get("window").width * 0.9,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
  },
  userText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    color: COLORS.TEXT_BLACK,
  },
  addFab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    padding: 10,
  },
  createUserView: {
    marginTop: 60,
  },
});

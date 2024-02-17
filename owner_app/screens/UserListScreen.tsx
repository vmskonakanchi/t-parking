import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, SCREEN_NAMES} from '../constants';
import api from '../api/api';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditInput from '../components/EditInput';
import MyButton from '../components/MyButton';

type UserItem = {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
};

const UserListScreen = ({navigation}: any) => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);

  const renderItem = ({item}: {item: UserItem}) => {
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
      const {data} = await api.get('/users/');
      setUsers(data);
    } catch (error: {message: string}) {
      console.log(error.message);
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
          marginTop={Dimensions.get('window').height / 2}
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
          clientName="test"
        />
      ) : (
        <FlatList
          data={users}
          style={styles.listContainer}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <TouchableHighlight
        style={styles.addFab}
        underlayColor={COLORS.SECONDARY}
        onPress={() => setIsCreateUser(!isCreateUser)}>
        <Icon
          name={isCreateUser ? 'arrow-back' : 'add'}
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
  clientName: string;
};

const CreateUser = (props: CreateUserProps) => {
  const {setLoading, setUsers, users, clientName} = props;

  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (value: string, name: string) => {
    setDetails({...details, [name]: value});
  };

  const addUser = async () => {
    try {
      setLoading(true);
      details.username = details.email;
      await api.post('/users/', details);
      setUsers([...users, details]);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.createUserView}>
        <EditInput
          label="Enter name"
          onChangeText={text => handleChange(text, 'name')}
        />
        <EditInput
          label="Enter phone"
          maxLength={10}
          keyBoardType="phone-pad"
          onChangeText={text => handleChange(text, 'phone')}
        />
        <EditInput
          label="Enter email"
          keyBoardType="email-address"
          onChangeText={text => handleChange(text, 'email')}
        />
        <EditInput
          label="Enter password"
          onChangeText={text => handleChange(text, 'password')}
          secureTextEntry={true}
        />
        <MyButton title="Create User" onPress={addUser} />
      </View>
      <Text>{JSON.stringify(details, null, 4)}</Text>
    </ScrollView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY,
  },
  listContainer: {
    marginTop: Dimensions.get('window').height / 20,
  },
  userContainer: {
    width: Dimensions.get('window').width * 0.9,
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
  },
  userText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    color: COLORS.TEXT_BLACK,
  },
  addFab: {
    position: 'absolute',
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

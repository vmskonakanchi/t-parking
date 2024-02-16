import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

type UserItem = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const UserCreateScreen = () => {
  const renderItem = ({item, index}: {item: UserItem}) => {
    return (
      <View style={styles.user}>
        <View style={styles.userInfo}>
          <Text style={{...styles.text, fontSize: 18}}>{item.name}</Text>
          <Text
            style={{...styles.text, fontSize: 16, color: COLORS.TEXT_BLACK}}>
            {item.email}
          </Text>
          <Text
            style={{...styles.text, fontSize: 16, color: COLORS.TEXT_BLACK}}>
            {item.role}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create User Screen</Text>
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default UserCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 30,
    color: COLORS.TEXT_BLACK,
  },
});

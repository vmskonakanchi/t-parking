import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {COLORS, SCREEN_NAMES} from '../constants';
import * as Screens from '../screens';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const baseOptions = {
  headerShown: false,
  tabBarLabelStyle: {
    fontFamily: 'Poppins-Bold',
    color: COLORS.TEXT_BLACK,
  },
};

const homeOptions: BottomTabNavigationOptions = {
  ...baseOptions,
  tabBarIcon: ({size, focused}) => (
    <Icon
      name="home"
      size={size}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT_BLACK}
    />
  ),
};

const userCreateOptions: BottomTabNavigationOptions = {
  ...baseOptions,
  tabBarLabel: 'Create User',
  tabBarIcon: ({size, focused}) => (
    <Icon
      name="account-plus"
      size={size}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT_BLACK}
    />
  ),
};

const parkingOptions: BottomTabNavigationOptions = {
  ...baseOptions,
  tabBarIcon: ({size, focused}) => (
    <Icon
      name="parking"
      size={size}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT_BLACK}
    />
  ),
};

const logoutOptions: BottomTabNavigationOptions = {
  ...baseOptions,
  tabBarLabel: 'Logout',
  tabBarIcon: ({size, focused}) => (
    <Icon
      name="logout"
      size={size}
      color={focused ? COLORS.PRIMARY : COLORS.TEXT_BLACK}
    />
  ),
};

const TabNavigation = ({navigation}: any) => {
  const handleLogout = (e: {preventDefault: () => void}) => {
    e.preventDefault();
    navigation.popToTop(); // This will take us to the first screen in the stack (LoginScreen)
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={homeOptions}
        name={SCREEN_NAMES.DASHBOARD}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        options={userCreateOptions}
        name={SCREEN_NAMES.USER_CREATE}
        component={Screens.UserCreateScreen}
      />
      <Tab.Screen
        options={parkingOptions}
        name={SCREEN_NAMES.PARKINGS}
        component={Screens.ParkingScreen}
      />
      <Tab.Screen
        options={logoutOptions}
        name={SCREEN_NAMES.LOGIN}
        component={Screens.LoginScreen}
        listeners={{tabPress: handleLogout}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

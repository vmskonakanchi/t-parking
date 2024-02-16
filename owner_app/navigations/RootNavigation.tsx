import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screens from '../screens';
import {SCREEN_NAMES} from '../constants';
import React from 'react';

import TabNavigation from './TabNavigation';

const StackNavigator = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        options={{headerShown: false}}
        name={SCREEN_NAMES.LOGIN}
        component={Screens.LoginScreen}
      />
      <StackNavigator.Screen
        options={{headerShown: false}}
        name={SCREEN_NAMES.MAIN_NAV}
        component={TabNavigation}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigation;

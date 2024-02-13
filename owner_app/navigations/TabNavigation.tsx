import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREEN_NAMES} from '../constants';
import * as Screens from '../screens';
import React from 'react';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={SCREEN_NAMES.DASHBOARD}
        component={Screens.HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

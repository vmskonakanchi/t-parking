import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigations/RootNavigation';
import React from 'react';
import {RootSiblingParent} from 'react-native-root-siblings';

function App() {
  return (
    <>
      <NavigationContainer>
        <RootSiblingParent>
          <RootNavigation />
        </RootSiblingParent>
      </NavigationContainer>
    </>
  );
}

export default App;

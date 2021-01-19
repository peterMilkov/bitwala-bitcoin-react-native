import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import BlocksList from '../Components/BlocksList';
import {colors} from '../styles';
import BlocksDetails from '../Components/BlocksDetails';

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.lightGray,
  },
  headerTintColor: colors.white,
};

const Stack = createStackNavigator();

export default function BlocksScreen() {
  return (
    <Stack.Navigator initialRouteName="BlockList" screenOptions={screenOptions}>
      <Stack.Screen
        name="BlockList"
        component={BlocksList}
        options={{title: 'Blocks List', headerTintColor: colors.black}}
      />
      <Stack.Screen
        name="BlocksDetails"
        component={BlocksDetails}
        options={{title: 'Details', headerTintColor: colors.black}}
      />
    </Stack.Navigator>
  );
}

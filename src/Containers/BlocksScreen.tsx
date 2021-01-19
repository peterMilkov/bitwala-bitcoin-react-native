import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import BlocksList from '../Components/BlocksList';
import {colors, screenOptions} from '../styles';

const Stack = createStackNavigator();

export default function BlocksScreen() {
  return (
    <Stack.Navigator initialRouteName="BlockList" screenOptions={screenOptions}>
      <Stack.Screen
        name="BlockList"
        component={BlocksList}
        options={{title: 'Blocks List', headerTintColor: colors.black}}
      />
    </Stack.Navigator>
  );
}

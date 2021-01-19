import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import TransactionsList from '../Components/TransactionsList';

import {colors, screenOptions} from '../styles';

const Stack = createStackNavigator();

export default function TransactionsScreen() {
  return (
    <Stack.Navigator
      initialRouteName="TransactionsList"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="TransactionsList"
        component={TransactionsList}
        options={{title: 'Transactions List', headerTintColor: colors.black}}
      />
    </Stack.Navigator>
  );
}

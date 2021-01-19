import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import TransactionsList from '../Components/TransactionsList';

import {colors} from '../styles';
import TransactionsDetails from '../Components/TransactionsDetails';

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.lightGray,
  },
  headerTintColor: colors.white,
};

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
      <Stack.Screen
        name="TransactionsDetails"
        component={TransactionsDetails}
        options={{title: 'Details', headerTintColor: colors.black}}
      />
    </Stack.Navigator>
  );
}

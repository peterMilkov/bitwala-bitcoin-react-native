/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import TransactionsScreen from './Containers/TransactionScreen';
import BlocksScreen from './Containers/BlocksScreen';
import {colors} from './styles';

const client = new ApolloClient({
  uri: 'https://graphql.bitquery.io',
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGray}}>
          <Tab.Navigator
            initialRouteName="Transactions"
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              activeBackgroundColor: 'lightgray',
              labelPosition: 'beside-icon',
            }}>
            <Tab.Screen
              name="Transactions"
              component={TransactionsScreen}
              options={{tabBarLabel: 'TRANSACTIONS'}}
            />
            <Tab.Screen
              name="Blocks"
              component={BlocksScreen}
              options={{tabBarLabel: 'BLOCKS'}}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

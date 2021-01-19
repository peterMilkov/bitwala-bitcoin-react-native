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
import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {persistCache} from 'apollo3-cache-persist';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import TransactionsScreen from './Containers/TransactionScreen';
import BlocksScreen from './Containers/BlocksScreen';
import {colors} from './styles';
import AppLoading from './Components/AppLoading';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://graphql.bitquery.io',
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const Tab = createBottomTabNavigator();

const App = () => {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  if (loadingCache) {
    return <AppLoading />;
  }

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

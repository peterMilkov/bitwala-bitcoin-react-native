import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {colors, globalStyles} from '../styles';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AppLoading from './AppLoading';

const GET_TRANSACTIONS = gql`
  query {
    bitcoin {
      transactions(options: {desc: "date.date", limit: 50}) {
        index
        date {
          date
        }
      }
    }
  }
`;

const TransactionsList = () => {
  const {navigate} = useNavigation();
  const {loading, data} = useQuery(GET_TRANSACTIONS);

  const renderTransactions = ({
    item: {
      index,
      date: {date},
    },
  }: {
    item: {
      index: string;
      date: {date: string};
    };
  }) => {
    return (
      <Pressable
        style={[
          {
            width: '100%',
            backgroundColor: 'white',
            borderBottomColor: colors.lightGray,
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
          },
        ]}
        onPress={() => {
          navigate('TransactionsDetails', {
            transaction: {
              index,
              date,
            },
          });
        }}>
        <Text style={[globalStyles.title]}>{`${date}`}</Text>
        <Text style={globalStyles.infoTxt}>{`${index}`}</Text>
      </Pressable>
    );
  };

  if (loading) {
    return <AppLoading />;
  }

  return (
    <View style={globalStyles.center}>
      <FlatList
        style={{width: '100%', height: '100%'}}
        data={data?.bitcoin.transactions}
        renderItem={renderTransactions}
        keyExtractor={(item) => item.index}
      />
    </View>
  );
};

export default TransactionsList;

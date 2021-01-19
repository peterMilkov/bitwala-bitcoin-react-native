import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {colors, globalStyles} from '../styles';
import {FlatList} from 'react-native-gesture-handler';

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
      onPress={() => {}}>
      <Text style={[globalStyles.title]}>{`${date}`}</Text>
      <Text style={globalStyles.infoTxt}>{`${index}`}</Text>
    </Pressable>
  );
};

const TransactionsList = () => {
  const {loading, error, data} = useQuery(GET_TRANSACTIONS, {
    variables: {limit: 10},
  });

  return (
    <View style={globalStyles.center}>
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.tomato} />
      ) : (
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={data?.bitcoin.transactions}
          renderItem={renderTransactions}
          keyExtractor={(item) => item.index}
        />
      )}
    </View>
  );
};

export default TransactionsList;

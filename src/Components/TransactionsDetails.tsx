import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../styles';

const TransactionsDetails = ({
  route,
}: {
  route: {params: {transaction: {index: number; date: string}}};
}) => {
  const {transaction} = route.params;

  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={[globalStyles.bigTitle, {marginBottom: 20}]}>
        {'Transaction Details:'}
      </Text>

      {transaction && (
        <View style={{flex: 1}}>
          <View style={[globalStyles.row]}>
            <Text style={globalStyles.title}>{'Index: '}</Text>
            <Text style={globalStyles.infoTxt}>{`${transaction.index}`}</Text>
          </View>
          <View style={[globalStyles.row]}>
            <Text style={globalStyles.title}>{'Date: '}</Text>
            <Text style={globalStyles.infoTxt}>{`${transaction.date}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TransactionsDetails;

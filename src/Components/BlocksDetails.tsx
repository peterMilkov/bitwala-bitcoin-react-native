import React from 'react';
import {View, Text} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {globalStyles} from '../styles';
import AppLoading from './AppLoading';

const GET_BLOCK = gql`
  query($hash: String) {
    bitcoin {
      blocks(blockHash: {is: $hash}) {
        transactionCount
        blockWeight
        blockSize
        difficulty
        height
        timestamp {
          unixtime
        }
        date {
          date
        }
      }
    }
  }
`;

const BlocksDetails = ({
  route,
}: {
  route: {
    params: {
      block: {
        index: number;
        transactionCount: number;
        blockHash: string;
        height: number;
        date: string;
        timestamp: {unixtime: number};
      };
    };
  };
}) => {
  const {block} = route.params;
  const {loading, data} = useQuery(GET_BLOCK, {
    variables: {hash: block.blockHash},
  });

  if (loading) {
    return <AppLoading />;
  }
  let [
    {difficulty, height, blockWeight, blockSize, date, transactionCount},
  ] = data?.bitcoin.blocks;

  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={[globalStyles.bigTitle, {marginBottom: 20}]}>
        {'Block Details:'}
      </Text>
      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Date: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${date.date}`}</Text>
      </View>
      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Transaction Count: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${transactionCount}`}</Text>
      </View>

      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Height: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${height}`}</Text>
      </View>
      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Block Weight: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${blockWeight}`}</Text>
      </View>
      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Block Size: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${blockSize}`}</Text>
      </View>
      <View style={[globalStyles.row]}>
        <Text style={globalStyles.title}>{'Difficulty: '}</Text>
        <Text style={globalStyles.infoTxt}>{`${difficulty}`}</Text>
      </View>
    </View>
  );
};

export default BlocksDetails;

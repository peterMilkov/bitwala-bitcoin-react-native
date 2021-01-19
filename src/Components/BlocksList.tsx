import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {globalStyles} from '../styles';
import {FlatList} from 'react-native-gesture-handler';
import {format} from 'date-fns/esm';
import {fromUnixTime} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import AppLoading from './AppLoading';

const GET_BLOCKS = gql`
  query {
    bitcoin {
      blocks(options: {limit: 20, desc: "date.date"}) {
        height
        blockHash
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

const BlocksList = () => {
  const {navigate} = useNavigation();
  const {loading, data} = useQuery(GET_BLOCKS);

  const renderBlocks = ({
    item,
  }: {
    item: {
      blockHash: string;
      height: string;
      timestamp: {unixtime: number};
    };
  }) => {
    let {blockHash, height, timestamp} = item;
    return (
      <Pressable
        style={globalStyles.rowBtn}
        onPress={() => {
          navigate('BlocksDetails', {
            block: item,
          });
        }}>
        <View style={globalStyles.row}>
          <Text style={[globalStyles.title, {paddingBottom: 10}]}>{`${format(
            fromUnixTime(timestamp.unixtime),
            'yyyy-MM-dd HH:ss',
          )}`}</Text>
        </View>
        <View style={globalStyles.row}>
          <Text style={globalStyles.title}>{'Height: '}</Text>
          <Text style={globalStyles.infoTxt}>{`${height}`}</Text>
        </View>
        <View style={globalStyles.column}>
          <Text style={globalStyles.title}>{`Hash: `}</Text>
          <Text style={globalStyles.infoTxt}>{`${blockHash}`}</Text>
        </View>
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
        data={data?.bitcoin.blocks}
        renderItem={renderBlocks}
        keyExtractor={(item) => item.blockHash}
      />
    </View>
  );
};

export default BlocksList;

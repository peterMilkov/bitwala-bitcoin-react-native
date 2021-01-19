import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {colors, globalStyles} from '../styles';
import {FlatList} from 'react-native-gesture-handler';
import {format} from 'date-fns/esm';
import {fromUnixTime} from 'date-fns';

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

const renderBlocks = ({
  item: {
    blockHash,
    height,
    timestamp: {unixtime},
  },
}: {
  item: {
    blockHash: string;
    height: string;
    timestamp: {unixtime: number};
  };
}) => {
  return (
    <Pressable style={globalStyles.rowBtn} onPress={() => {}}>
      <View style={globalStyles.row}>
        <Text style={[globalStyles.title, {paddingBottom: 10}]}>{`${format(
          fromUnixTime(unixtime),
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

const BlocksList = () => {
  const {loading, data} = useQuery(GET_BLOCKS, {
    variables: {limit: 10},
  });

  return (
    <View style={globalStyles.center}>
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.tomato} />
      ) : (
        <FlatList
          style={{width: '100%', height: '100%'}}
          data={data?.bitcoin.blocks}
          renderItem={renderBlocks}
          keyExtractor={(item) => item.blockHash}
        />
      )}
    </View>
  );
};

export default BlocksList;

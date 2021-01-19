import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors, globalStyles} from '../styles';

const AppLoading = () => {
  return (
    <View style={globalStyles.center}>
      <ActivityIndicator color={colors.tomato} size={'large'} />
    </View>
  );
};

export default AppLoading;

import {StyleSheet} from 'react-native';

export const colors = {
  black: '#000',
  white: '#fff',
  tomato: 'tomato',
  lightGray: 'lightgray',
  gray: 'gray',
};

export const globalStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoTxt: {
    fontSize: 12,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  column: {
    width: '100%',
    flexDirection: 'column',
  },
  rowBtn: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    padding: 20,
  },
});

import {Dimensions} from 'react-native';

const size = {
  xs: '5',
  md: '10',
  lg: '20',
  xl: '30',
};

export const VW = (value: number) => {
  return (Dimensions.get('window').width / 100) * value;
};

export const VH = (value: number = 100) => {
  return (Dimensions.get('window').height / 100) * value;
};

export default size;

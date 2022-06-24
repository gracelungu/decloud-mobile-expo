import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../styles/colors';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10@s',
    right: '10@s',
    padding: '10@s',
    borderRadius: '40@s',
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: '50@s',
  },
  text: {
    marginLeft: '5@s',
  },
});

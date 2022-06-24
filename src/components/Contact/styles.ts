import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../styles/colors';

export default ScaledSheet.create({
  container: {
    width: '100%',
    paddingTop: '20@s',
  },
  itemContainer: {
    width: '100%',
    padding: '8@s',
    paddingTop: '15@s',
    paddingBottom: '20@s',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  image: {
    width: '50@s',
    height: '50@s',
    borderRadius: '50@s',
    marginRight: '15@s',
  },
  name: {
    fontSize: '18@s',
    fontWeight: '500',
    paddingBottom: '8@s',
  },
  phone: {
    fontSize: '16@s',
    fontWeight: '300',
  },
});

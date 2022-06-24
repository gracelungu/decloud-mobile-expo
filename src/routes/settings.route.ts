import {SETTINGS_SCREEN} from '../constants/screens';
import Icon from '../assets/icons/Settings.svg';
import IconActive from '../assets/icons/Settings-filled.svg';
import SettingsScreen from '../screens/Settings';

const settingRouter = {
  Icon,
  IconActive,
  name: SETTINGS_SCREEN,
  component: SettingsScreen,
  options: {
    title: SETTINGS_SCREEN,
    headerShown: false,
  },
};

export default settingRouter;

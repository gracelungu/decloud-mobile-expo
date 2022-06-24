import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import colors from '../styles/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <BottomNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

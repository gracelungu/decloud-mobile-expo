import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import photosRoute from "../../routes/photos.route";
import { PHOTOS_SCREEN } from "../../constants/screens";
import videosRouter from "../../routes/videos.route";
import contactsRouter from "../../routes/contacts.route";
import settingsRouter from "../../routes/settings.route";
import colors from "../../styles/colors";
import capitalize from "../../helpers/capitalize";

const Tab = createBottomTabNavigator();

const bottomScreens = [
  photosRoute,
  videosRouter,
  contactsRouter,
  settingsRouter,
];

function BottomNavigation() {
  return (
    <Tab.Navigator initialRouteName={PHOTOS_SCREEN}>
      {bottomScreens.map(({ name, component, options, Icon, IconActive }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            ...options,
            title: capitalize(options.title),
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: { paddingTop: 10 },
            tabBarIconStyle: { marginBottom: 5 },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <IconActive width={30} height={30} />
              ) : (
                <Icon width={30} height={30} />
              ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default BottomNavigation;

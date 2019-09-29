
import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import { LaunchCampaign } from '../screens/LaunchCampaign';
import { LaunchDiscountProducts } from '../screens/LaunchDiscountProducts';
import { ListCampaignScreen } from '../screens/ListCampaign';
import SettingsScreen from '../screens/SettingsScreen';
import UserScreen from "../screens/UserScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

HomeStack.path = "";

const UserStack = createStackNavigator(
  {
    Links: UserScreen
  },
  config
);

UserStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

UserStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LaunchDiscountProducts,
  },
  config
);
LinksStack.navigationOptions = {
  tabBarLabel: 'MDiscount',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};
LinksStack.path = '/merchant-launch-discount';

const LaunchCampStack = createStackNavigator(
  {
    LaunchCampaign: LaunchCampaign,
  },
  config
);

LaunchCampStack.navigationOptions = {
  tabBarLabel: 'MCampaign',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
LaunchCampStack.path = '/merchant-launch-campaign';

const ListCampStack = createStackNavigator(
  {
    ListCampaign: ListCampaignScreen,
  },
  config
);
ListCampStack.navigationOptions = {
  tabBarLabel: 'UCampaigns',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};
ListCampStack.path = '/merchant-launch-campaign';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  LaunchCampStack,
  SettingsStack,
  UserStack,
  ListCampStack
});

tabNavigator.path = "";

export default tabNavigator;

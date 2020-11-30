import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { HomeNavigatorComponent } from './HomeNavigator';
import colors from '../constants/colors';
import ProfileStackScreen from './ProfileStack';
import Search from '../screens/Search';
import CartScreen from '../screens/Cart';


const TabNavigator = createBottomTabNavigator();


export default function TabNavigatorComponent() {


return(
  <TabNavigator.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Search") {
          iconName = "search-web";
        } else if (route.name === "TabHome") {
          iconName = "format-list-bulleted";
        } else if (route.name === "Cart") {
          iconName = "cart";
        } else if (route.name === "Profile") {
          iconName = focused ? "account-circle" : "account-circle-outline";
        }
        return (
          <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.blue,
      inactiveTintColor: "gray",
      showLabel: false,
    }}
  >
    <TabNavigator.Screen name="TabHome" component={HomeNavigatorComponent}/>
    <TabNavigator.Screen name='Search' component={Search}/>
    <TabNavigator.Screen name='Cart' component={CartScreen}/>
    <TabNavigator.Screen name='Profile' component={ProfileStackScreen}>
    </TabNavigator.Screen>
  </TabNavigator.Navigator>
)
};
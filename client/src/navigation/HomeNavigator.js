import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../constants/colors'

const HomeNavigator = createStackNavigator()

import Home from '../screens/Home'
import ItemList from '../screens/ItemList'
import ItemDescription from '../screens/ItemDescription'
import CommentsScreen from '../screens/CommentsScreen'

export const HomeNavigatorComponent = () => (
    <HomeNavigator.Navigator>
        <HomeNavigator.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false,
            }}
        />
        <HomeNavigator.Screen
            name="ItemList"
            component={ItemList}
            options={{
                headerShown: false,
            }}
        />
    </HomeNavigator.Navigator>
)

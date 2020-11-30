import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Options from '../screens/Options'
import Profile from '../screens/Profile'
import colors from '../constants/colors'
import Favourite from '../screens/Favourite'
import OrderHistory from '../screens/OrderHistory'

const ProfileStack = createStackNavigator()

export default function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator initialRouteName="Profile">
            <ProfileStack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen
                name="Options"
                component={Options}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen
                name="Favourite"
                component={Favourite}
                options={{ headerShown: false }}
            />
            <ProfileStack.Screen
                name="OrderHistory"
                component={OrderHistory}
                options={{ headerShown: false }}
            />
        </ProfileStack.Navigator>
    )
}

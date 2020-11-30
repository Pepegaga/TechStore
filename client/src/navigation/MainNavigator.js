import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigatorComponent from './TabNavigator';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Loading from '../screens/startLoadingScreen'
import ItemDescription from '../screens/ItemDescription'
import ForgotPass from '../screens/ForgotPassScreen'
import CommentsScreen from '../screens/CommentsScreen';
import LeaveCommentScreen from '../screens/LeaveCommentScreen'

const MainStack = createStackNavigator();


export const MainStackComponent = () => (

    <MainStack.Navigator initialRouteName="Loading">
        <MainStack.Screen name="Loading" component={Loading} options={{
        headerShown: false,
        gestureEnabled: false,
         }}/>
        <MainStack.Screen name='SignIn' component={SignIn} options={{
        headerShown: false,
        gestureEnabled: false,
         }}/>
         <MainStack.Screen name='SignUp' component={SignUp} options={{
        headerShown: false,
         }}/>
         <MainStack.Screen name="Tabs" component={TabNavigatorComponent} options={{
        headerShown: false,
        gestureEnabled: false,
         }}/>
         <MainStack.Screen name="ItemDescription" component={ItemDescription} options={{
            headerShown: false,
        }}/>
        <MainStack.Screen name="ForgotPass" component={ForgotPass} options={{
            headerShown: false,
        }}/>
        <MainStack.Screen name="CommentsScreen" component={CommentsScreen} options={{
            headerShown: false,
        }}/>
        <MainStack.Screen name="LeaveCommentScreen" component={LeaveCommentScreen} options={{
            headerShown: false,
        }}/>
    </MainStack.Navigator>
)
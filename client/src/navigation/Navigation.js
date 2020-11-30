import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  {MainStackComponent}  from '../../src/navigation/MainNavigator';

export default () => {

    return(
        
        <NavigationContainer>
            <MainStackComponent/>
        </NavigationContainer>
    )
}
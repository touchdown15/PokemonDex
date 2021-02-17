import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../views/SplashScreen';
import SignInScreen from '../views/SignInScreen';
import MainScreen from '../views/MainScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="SplashScreen"
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
    <Stack.Screen name="SignInScreen" component={SignInScreen}/>
    <Stack.Screen name="MainScreen" component={MainScreen}/>
  </Stack.Navigator>
);
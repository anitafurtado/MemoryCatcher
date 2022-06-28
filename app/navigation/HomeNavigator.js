import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/Account/HomeScreen';

import AppColors from '../config/AppColors';

import CollectionsNavigator from './CollectionsNavigatior';

const Stack = createStackNavigator();

//Navigator for the Home Screen, gives access to the TabNavigator and CollectionsNavigator

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: AppColors.primaryVariantColor },
      title: "", 
      headerBackTitle: "Back"
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>

    <Stack.Screen name="MyCollectionsNav" component={CollectionsNavigator} options={{ headerShown: false }}/>

  </Stack.Navigator>
)

export default HomeNavigator;
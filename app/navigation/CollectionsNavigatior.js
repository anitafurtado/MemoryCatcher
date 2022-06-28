import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import EditMemoryInformationScreen from '../screens/Account/EditMemoryInformationScreen';
import MemoriesScreen from '../screens/Account/MemoriesScreen';
import MemoryInformationScreen from '../screens/Account/MemoryInformationScreen';
import MyCollectionsScreen from '../screens/Account/MyCollectionsScreen';

import AppColors from '../config/AppColors';

const Stack = createStackNavigator();

//Navigator for collections and memories

const CollectionsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: AppColors.primaryVariantColor },
      title: "", 
      headerBackTitle: "Back"
    }}
  >
    <Stack.Screen name="MyCollections" component={MyCollectionsScreen} options={{ headerShown: false }}/>

    <Stack.Screen name="Memories" component={MemoriesScreen} />
    <Stack.Screen name="MemoryInformation" component={MemoryInformationScreen} />
    <Stack.Screen name="EditMemoryInformation" component={EditMemoryInformationScreen} />
    
  </Stack.Navigator>
)

export default CollectionsNavigator;
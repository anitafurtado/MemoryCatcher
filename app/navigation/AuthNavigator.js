import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/Login/LoginScreen';
import MyCollectionsScreen from '../screens/Account/MyCollectionsScreen';
import RegisterScreenDOB from '../screens/Register/RegisterScreenDOB';
import RegisterScreenEP from '../screens/Register/RegisterScreenEP';
import RegisterScreenName from '../screens/Register/RegisterScreenName';
import RegisterScreenR from '../screens/Register/RegisterScreenR';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';

import AppColors from '../config/AppColors';

import TabNavigator from './TabNavigator';


const Stack = createStackNavigator();

//Navigator for the Login/Register system

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: AppColors.primaryVariantColor },
      title: "", 
      headerBackTitle: "Back",
    }}
  >
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>

    <Stack.Screen name="Login" component={LoginScreen}/>

    <Stack.Screen name="RegisterName" component={RegisterScreenName}/>
    <Stack.Screen name="RegisterDOB" component={RegisterScreenDOB}/>
    <Stack.Screen name="RegisterEP" component={RegisterScreenEP}/>
    <Stack.Screen name="RegisterR" component={RegisterScreenR}/>

    <Stack.Screen name="HomeWithTab" component={TabNavigator} options={{ headerShown: false }}/>
    <Stack.Screen name="MyCollections" component={MyCollectionsScreen} options={{ headerShown: false }}/>
    
  </Stack.Navigator>
)

export default AuthNavigator;
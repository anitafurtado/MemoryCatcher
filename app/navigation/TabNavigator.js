import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MyAccountScreen from '../screens/Account/MyAccountScreen';

import AppColors from '../config/AppColors';

import CollectionsNavigator from './CollectionsNavigatior';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

//Navigator for the Home Screen, My Collections Screen (with Navigator) and My Account Screen

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: AppColors.primaryVariantColor,
            tabBarInactiveBackgroundColor: AppColors.primaryVariantColor,
            tabBarActiveTintColor: AppColors.primaryColor,
        }}
    >
        <Tab.Screen name="HomeNav" component={HomeNavigator} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" size={33} color={color}/>),
                }}/>
        <Tab.Screen name="MyCollectionsNav" component={CollectionsNavigator} 
            options={{
                tabBarLabel: "My Collections",
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="image-multiple" size={35} color={color}/>),

                }}/>
        <Tab.Screen name="MyAccount" component={MyAccountScreen} 
            options={{
                tabBarLabel: "My Account",
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" size={35} color={color}/>),

                }}/>
    </Tab.Navigator>
)

export default TabNavigator;
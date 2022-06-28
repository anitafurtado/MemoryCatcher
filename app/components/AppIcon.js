import React from 'react';
import { View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import AppColors from '../config/AppColors';


function AppIcon({name, size=60, color = AppColors.primaryVariantColor, style}) {
  return (
    <View style = {[{alignItems: "center", height: size, justifyContent: "center", width: size}, style]}>
      <MaterialCommunityIcons
        name = {name}
        size = {size}
        color = {color}
      />
    </View>
  );
}

export default AppIcon;
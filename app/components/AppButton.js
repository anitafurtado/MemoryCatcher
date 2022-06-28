import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';

function AppButton({onPress, style, styleText, title}) {
  return (
    <TouchableOpacity onPress = {onPress}> 
      <View style={[styles.button, style]}>
        <AppText style={[styles.text, styleText]}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button:{
    alignItems: 'center',
    backgroundColor: AppColors.secondaryColor,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    width: 100,
     
  },
  text:{
    color: AppColors.black,
    fontSize: 18,
    textAlign: "center",
  }
})

export default AppButton;
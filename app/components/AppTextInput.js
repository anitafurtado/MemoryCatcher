import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import AppColors from '../config/AppColors';

function AppTextInput({style, ...otherProps}) {
  return (
    <TextInput 
      style={[styles.textInput, style]} 
      placeholderTextColor = {AppColors.black} 
      {...otherProps} />
  );
}

const styles = StyleSheet.create({
  textInput:{
    borderRadius: 20,
    borderWidth: 1,
    margin: 10,
    padding: 10, 
    width: 200,
    
  }
})

export default AppTextInput;
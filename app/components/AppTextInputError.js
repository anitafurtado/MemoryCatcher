import React from 'react';
import { StyleSheet } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';


function AppTextInputError({children}) {
  return (
    <AppText style={styles.text}>
      {children}
    </AppText>
  );
}
const styles = StyleSheet.create({
  text:{
    color: AppColors.errorColor,
    fontStyle: 'italic',
    fontSize: 13,
  }
})
export default AppTextInputError;
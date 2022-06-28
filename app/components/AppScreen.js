import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import AppColors from '../config/AppColors';

function AppScreen({children, style}) {
  return (
    <SafeAreaView style={[styles.container, style]}> 
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: AppColors.primaryColor,
    flex:1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})

export default AppScreen;
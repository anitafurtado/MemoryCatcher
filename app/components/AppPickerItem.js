import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';

function AppPickerItem({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: AppColors.secondaryColor,
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    borderWidth: 1,
    borderRadius: 45,
    marginTop: 10,
  },
  text:{
    textAlign: "center",
  }
})

export default AppPickerItem;
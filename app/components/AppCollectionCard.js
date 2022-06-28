import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';


function AppCollectionCard({name, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText>{name}</AppText>
      </View>
    </TouchableOpacity>
    
  );
}
const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: AppColors.secondaryColor,
    borderRadius: 10,
    borderWidth: 3,
  }
})
export default AppCollectionCard;
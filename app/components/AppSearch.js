import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import AppColors from '../config/AppColors';

function AppSearch({placeholder, style, ...otherProps}) {
  
  return (
    <View style = {[styles.searchBar, style]}>
      <Searchbar
        placeholder={placeholder}
        iconColor= {AppColors.secondaryColor}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar:{
    margin: 10,
  }
})

export default AppSearch;
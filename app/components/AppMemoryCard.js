import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppColors from '../config/AppColors';
import AppText from './AppText';


function AppMemoryCard({title, category, date, location, image, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topText}>
          <AppText>{date}</AppText>
          <AppText>{category}</AppText>
        </View>
        {isFinite(image) ? <Image source={image} style={styles.image}/> : <Image source={{uri: image}} style={styles.image}/>}
        <View style={styles.bottomText}>
          <AppText>{title}</AppText>
          <AppText>{location}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: AppColors.secondaryVariantColor,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  topText:{
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  image:{
    width: 250,
    height: 150,
    alignSelf: "center",
  },
  bottomText:{
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
})

export default AppMemoryCard;
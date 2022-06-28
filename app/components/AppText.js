import React from 'react';
import { StyleSheet, Text } from 'react-native';


function AppText({children, style}) {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text:{
    fontFamily: "Arial",
    fontSize: 18,
  }
})

export default AppText;
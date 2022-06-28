import React, {useState} from 'react';
import { StyleSheet } from 'react-native';

import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import DataManager from '../../config/DataManager';


function RegisterScreenR({navigation, route}) {
  //Data Manager variables 
  let data = DataManager.getInstance();
  let users = data.getUsers();
  const addUser = () => {
    let curUserID = users.length + 1;
    const user = {
      userID: curUserID,
      firstName: route.params.paramFirstName,
      lastName: route.params.paramLastName,
      DOB: route.params.paramDOB,
      email: route.params.paramEmail,
      password: route.params.paramPassword,
    }
    data.addUser(user);
  }
  return (
    <AppScreen style = {styles.container}>
      <AppText>You are almost there!</AppText>
      <AppText>Please check your information:</AppText>
      
      <AppText>Name: {route.params.paramFirstName} {route.params.paramLastName}</AppText>
      <AppText>DOB: {route.params.paramDOB}</AppText>
      <AppText>Email: {route.params.paramEmail}</AppText>
     
      <AppButton title="Register" onPress ={() => {
        addUser();
        navigation.navigate("Login",{paramMessage:"Register Successful! Please Login."});
      }}/>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
  }
})

export default RegisterScreenR;
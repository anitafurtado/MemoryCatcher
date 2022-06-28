import React from 'react';

import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import DataManager from '../../config/DataManager';


function MyAccountScreen({children}) {
  //Data Manager variables
  data = DataManager.getInstance();
  user = data.getCurUser();
  
  return (
    <AppScreen>
      <AppText style = {{fontSize: 28, marginTop: 50, alignSelf: "center"}}>Account Details</AppText>
      <AppText style = {{fontSize: 22, marginTop: 20, marginLeft: 20}}>Name: {user.firstName} {user.lastName}</AppText>
      <AppText style = {{fontSize: 22, marginTop: 10, marginLeft: 20}}>DOB: {user.DOB}</AppText>
      <AppText style = {{fontSize: 22, marginTop: 10, marginLeft: 20}}>Email: {user.email}</AppText>
    </AppScreen>
  );
}

export default MyAccountScreen;
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';

function RegisterScreenDOB({navigation, route}) {
  //Function for changing date when scrolling on Date Picker
  const onChange = (event, value) => {
    setDOB(value);
    
  };
   //State Variables
   const[DOB, setDOB] = useState(new Date());
  return (
    <AppScreen style = {styles.container}>
      <AppText style= {styles.introText}>What's your Birthday?</AppText>
      <DateTimePicker 
        value={DOB} 
        mode={"date"} 
        display={"spinner"} 
        style= {{width: 280, height: 200,}}
        onChange={onChange}
      />
      <AppButton 
        title="Next"
        onPress = {()=>{
          let dateFormatted = DOB.toISOString().split("T")[0];
          navigation.navigate("RegisterEP", {
            paramFirstName: route.params.paramFirstName,
            paramLastName: route.params.paramLastName,
            paramDOB: dateFormatted,
          }
          );
        }} 
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent: "center",
    alignItems: "center",
  },
  form:{
    justifyContent: "center",
    alignItems: "center",
  }
})

export default RegisterScreenDOB;
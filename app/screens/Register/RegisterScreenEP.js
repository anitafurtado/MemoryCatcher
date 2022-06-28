import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppTextInputError from '../../components/AppTextInputError';
import DataManager from '../../config/DataManager';

//Validation Schema
const schema = Yup.object().shape(
  {
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).max(10).label("Password"),
  }
);

//Check if User already exists
const userExists = ({email}) => {
  return(
    DataManager.getInstance().userExists(email)
      );
}

function RegisterScreenEP({navigation, route}) {
  return (
    <AppScreen style = {styles.container}>
      <AppText>Please enter your email and password.</AppText>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values)=>{
          if(userExists(values)){
            alert("You already have an account with this email. Please try again.")
          } else {
            navigation.navigate("RegisterR", {
              paramFirstName: route.params.paramFirstName,
              paramLastName: route.params.paramLastName,
              paramDOB: route.params.paramDOB,
              paramEmail: values.email,
              paramPassword: values.password,
          });
          }
          
        }
          
        }
        validationSchema={schema}
      >
        {({handleChange, handleSubmit, errors, setFieldTouched, touched})=>(
          <>
            <View style={styles.form}>
              <AppTextInput
                placeholder="Email"
                onChangeText = {handleChange("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur = {() => setFieldTouched("email")}
              />
              {touched.email && <AppTextInputError>{errors.email}</AppTextInputError>}
              <AppTextInput
                placeholder="Password"
                onChangeText = {handleChange("password")}
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                onBlur = {() => setFieldTouched("password")}
              />
              {touched.password && <AppTextInputError>{errors.password}</AppTextInputError>}
              <AppButton title="Next" onPress ={handleSubmit}/>
            </View>
            
          </>
        )}
      </Formik>
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

export default RegisterScreenEP;
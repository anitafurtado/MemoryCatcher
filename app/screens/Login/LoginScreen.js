import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppButton from '../../components/AppButton';
import AppColors from '../../config/AppColors';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppTextInputError from '../../components/AppTextInputError';
import DataManager from '../../config/DataManager';

// Validation Schema
const schema = Yup.object().shape(
  {
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).max(10).label("Password"),
  }
);

//Check if User information is correct
const validateUser = ({email, password}) => {
  let data = DataManager.getInstance();
  return data.validateUser(email, password);
};


function LoginScreen({navigation, route}) {
  const message = () =>{
    return route.params.paramMessage !==undefined;
  }
  return (
    <AppScreen>
      {message ? <AppText style={{textAlign: "center"}}>{route.params.paramMessage}</AppText> : <></>}
      <View style = {styles.container}>
        
        <AppText>Please Enter Your Login Details:</AppText>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values)=>{
            if(validateUser(values)) {
              let data = DataManager.getInstance();
              let user = data.getUser(values.email);
              data.setUserID(user.userID);
                navigation.navigate("HomeWithTab");
                            
            } else {
              alert("Invalid email or password. Please try again.")
            }
          }
            
          }
          validationSchema={schema}
          
        >
          {({handleChange, handleSubmit, errors, setFieldTouched, touched})=>(
            <>
              <View style = {styles.form}>
                <AppTextInput
                  placeholder="Email"
                  onChangeText = {handleChange("email")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onBlur = {() => setFieldTouched("email")}
                />
                {touched.email && <AppTextInputError>{errors.email}</AppTextInputError>}
                <AppTextInput
                  placeholder="Password"
                  onChangeText = {handleChange("password")}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onBlur = {() => setFieldTouched("password")}
                />
                {touched.password && <AppTextInputError>{errors.password}</AppTextInputError>}
                <AppButton title="Login" onPress ={handleSubmit}/>
              </View>
              
            </>
          )}
        </Formik>

      </View>
      
      
    </AppScreen>
  );
}

const styles = StyleSheet.create({ 
  container:{
    alignItems: "center",
    backgroundColor: AppColors.primaryColor,
    flex: 1,
    justifyContent: "center",
    
  },
  form:{
    alignItems: "center",
    justifyContent: "center",
  }
  
})

export default LoginScreen;
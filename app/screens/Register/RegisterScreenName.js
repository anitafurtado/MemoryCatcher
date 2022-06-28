import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';


import AppButton from '../../components/AppButton';
import AppScreen from '../../components/AppScreen';
import AppText from '../../components/AppText';
import AppTextInput from '../../components/AppTextInput';
import AppTextInputError from '../../components/AppTextInputError';

//Validation Schema
const schema = Yup.object().shape(
  {
    firstName: Yup.string().required().label("firstName"),
    lastName: Yup.string().required().label("lastName"),
  }
);

function RegisterScreenName({navigation}) {
  return (
    <AppScreen style = {styles.container}>
      <AppText style= {styles.introText}>What's your Name?</AppText>
      <Formik
        initialValues={{firstName: '', lastName: ''}}
        onSubmit={(values)=>{
          navigation.navigate("RegisterDOB", {
              paramFirstName: values.firstName,
              paramLastName: values.lastName,
          });
        }
          
        }
        validationSchema={schema}
      >
        {({handleChange, handleSubmit, errors, setFieldTouched, touched})=>(
          <>
            <View style={styles.form}>
              <AppTextInput
                placeholder="First Name"
                onChangeText = {handleChange("firstName")}
                autoCapitalize="words"
                autoCorrect={false}
                onBlur = {() => setFieldTouched("firstName")}
              />
              {touched.firstName && <AppTextInputError>{errors.firstName}</AppTextInputError>}
              <AppTextInput
                placeholder="Last Name"
                onChangeText = {handleChange("lastName")}
                autoCapitalize="words"
                autoCorrect={false}
                onBlur = {() => setFieldTouched("lastName")}
              />
              {touched.lastName && <AppTextInputError>{errors.lastName}</AppTextInputError>}
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

export default RegisterScreenName;